import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";

const registerRouter = express.Router();

registerRouter.post(
  "/",
  catchAsync(async (req, res, next) => {
    const body = req.body;
    const password = body.password;

    if (!password) {
      return res.status(400).send({ error: "password is required" });
    } else if (password.length < 6) {
      return res
        .status(400)
        .send({ error: "password must be at least 6 characters long" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email: body.email,
      passwordHash,
    });

    const savedUser = await user.save();
    res.json(savedUser);
  })
);

export default registerRouter;
