import bcrypt from "bcrypt";
import express from "express";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/user.model.js";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";

const usersRouter = express.Router();

usersRouter.post(
  "/",
  upload,
  catchAsync(async (req, res, next) => {
    const body = req.body;
    const password = body.password;

    let avatar;

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      avatar = result.secure_url;
    }

    if (!password) {
      return res.status(400).send({ error: "password is required" });
    } else if (password.length < 3) {
      return res
        .status(400)
        .send({ error: "password must be at least 3 characters long" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email: body.email,
      name: body.name,
      bio: body.bio,
      phone: body.phone,
      avatar,
      passwordHash,
    });

    const savedUser = await user.save();
    res.json(savedUser);
  })
);

export default usersRouter;
