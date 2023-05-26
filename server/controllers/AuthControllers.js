import prisma from "../prisma/client.js";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const generatePassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

const maxAge = 3 * 24 * 60 * 60;

const generateToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await prisma.user.create({
        data: {
          email,
          password: await generatePassword(password),
        },
      });
      return res.status(200).json({
        user: { id: user.id, email: user.email },
        jwt: generateToken(email, user.id),
      });
    }
    return res.status(400).send("Email and password are required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return res.status(400).send("User not found");
      }
      const auth = await compare(password, user.password);

      if (!auth) {
        return res.status(400).send("Invalid password");
      }

      return res.status(200).json({
        user: { id: user.id, email: user.email },
        jwt: generateToken(email, user.id),
      });
    }
    return res.status(400).send("Email and password are required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (req, res, next) => {
  // console.log(req.userId);
  try {
    if (req.userId) {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
      });
      delete user.password;
      // console.log({ user });
      return res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
