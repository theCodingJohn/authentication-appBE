import bcrypt from "bcrypt";
import express from "express";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/user.model.js";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";

const usersRouter = express.Router();

usersRouter.put(
  "/:id",
  upload,
  catchAsync(async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    const password = body.password;

    const toUpdate = await User.findById(id);

    let passwordHash = toUpdate.passwordHash;

    if (password && password?.length > 6) {
      const saltRounds = 10;
      passwordHash = await bcrypt.hash(password, saltRounds);
    } else if (password?.length < 6) {
      return res
        .status(400)
        .send({ error: "password must be at least 6 characters long" });
    }

    let avatar = toUpdate.avatar;

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      avatar = result.secure_url;
    }

    const user = {
      email: body.email,
      passwordHash,
      name: body.name,
      bio: body.bio,
      phone: body.phone,
      avatar,
    };

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.json(updatedUser);
  })
);

usersRouter.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
  })
);

export default usersRouter;
