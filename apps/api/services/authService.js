import { compare, genSalt, hash } from "bcrypt";
import prisma from "../prisma/client.js";
import { AppError, handleServiceError } from "../utils/index.js";

const generatePassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

export const registerUser = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new AppError(400, "Email and password are required");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new AppError(400, "User already exists.");
    }
    const user = await prisma.user.create({
      data: {
        email,
        password: await generatePassword(password),
        username: email.split("@")[0] + "fx",
      },
    });
    return user;
  } catch (error) {
    handleServiceError(error, "registering user");
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new AppError(400, "Email and password are required");
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError(400, "User not found.");
    }

    const auth = await compare(password, user.password);

    if (!auth) {
      throw new AppError(400, "Invalid password");
    }
    return user;
  } catch (error) {
    handleServiceError(error, "logging user");
  }
};
