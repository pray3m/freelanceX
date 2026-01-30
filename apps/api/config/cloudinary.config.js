import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Env } from "./env.config.js";

cloudinary.config({
  cloud_name: Env.CLOUDINARY_CLOUD_NAME,
  api_key: Env.CLOUDINARY_API_KEY,
  api_secret: Env.CLOUDINARY_API_SECRET,
});

const STORAGE_PARAMS = {
  folder: "freelanceX",
  allowed_formats: ["jpg", "png", "jpeg"],
  resource_type: "image",
  quality: "auto:good",
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    ...STORAGE_PARAMS,
  }),
});

// Main upload for multiple files (gigs)
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 5, // Allow up to 5 files for gigs
  },
  fileFilter: (req, file, cb) => {
    const isValid = /^image\/(jpe?g|png)$/.test(file.mimetype);
    if (!isValid) {
      return cb(new Error("Only JPEG and PNG files are allowed"), false);
    }
    cb(null, true);
  },
});

// Single upload for profile images
export const uploadSingle = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const isValid = /^image\/(jpe?g|png)$/.test(file.mimetype);
    if (!isValid) {
      return cb(new Error("Only JPEG and PNG files are allowed"), false);
    }
    cb(null, true);
  },
});
