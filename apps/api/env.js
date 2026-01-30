import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z
      .string()
      .transform(Number)
      .pipe(z.number().positive())
      .default("5001"),
    PUBLIC_URL: z.string().url(),
    JWT_SECRET: z.string().min(8),
    CLOUDINARY_NAME: z.string().optional(),
    CLOUDINARY_KEY: z.string().optional(),
    CLOUDINARY_SECRET: z.string().optional(),
    STRIPE_SECRET_KEY: z.string().optional(),
  },
  runtimeEnv: process.env,
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
  emptyStringAsUndefined: true,
});
