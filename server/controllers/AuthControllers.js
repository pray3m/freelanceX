import { renameSync } from "fs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";
import { loginUser, registerUser } from "../services/authService.js";

const maxAge = 3 * 24 * 60 * 60;

const generateToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await registerUser({ email, password });

    return res.status(200).json({
      user: { id: user.id, email: user.email },
      jwt: generateToken(email, user.id),
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });
    return res.status(200).json({
      user: { id: user.id, email: user.email },
      jwt: generateToken(email, user.id),
      message: "Login successful",
    });
  } catch (err) {
    next(err);
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

export const setUserInfo = async (req, res, next) => {
  try {
    if (req?.userId) {
      const { userName, fullName, description } = req.body;
      if (userName && fullName && description) {
        const userNameValid = await prisma.user.findUnique({
          where: { username: userName },
        });
        if (userNameValid) {
          return res.status(200).json({ userNameError: true });
        }

        await prisma.user.update({
          where: { id: req.userId },
          data: {
            username: userName,
            fullName,
            description,
            isProfileInfoSet: true,
          },
        });
        return res.status(200).send("Profile info set successfully");
      }
    } else {
      return res
        .status(400)
        .send("Username, Full name and Description are required");
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(400).json({ userNameError: true });
      }
    } else {
      return res.status(500).send("Internal Server Error");
    }
    throw err;
  }
};

export const setUserImage = async (req, res, next) => {
  try {
    if (req.file) {
      if (req.userId) {
        console.log(req.file);
        const date = Date.now();
        let fileName = "uploads/profiles/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);
        await prisma.user.update({
          where: { id: req.userId },
          data: { profileImage: fileName },
        });
        return res.status(200).json({ img: fileName });
      }
      return res.status(400).send("Cookie error");
    }
    return res.status(400).send("Image is required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
