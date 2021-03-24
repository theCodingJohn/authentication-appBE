import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

// Cloudinary
const cloudinary_name = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinary_url = process.env.CLOUDINARY_URL;
const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET_KEY;

const config = {
  PORT,
  MONGODB_URI,
  cloudinary_url,
  cloudinary_api_key,
  cloudinary_api_secret,
  cloudinary_name,
};

export default config;
