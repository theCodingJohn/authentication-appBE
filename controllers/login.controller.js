import express from "express";
import bcryt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";

const loginRouter = express.Router();

loginRouter.post(
  "/login",
  catchAsync(async (req, res, next) => {
    const body = req.body;

    const user = await User.findOne({ email: body.email });
    const passwordCorrect =
      user !== null
        ? await bcryt.compare(body.password, user.passwordHash)
        : null;

    if (!user) {
      return res.status(401).json({
        error: "invalid email",
      });
    }

    if (!passwordCorrect) {
      return res.status(401).json({
        error: "invalid password",
      });
    }

    const userForToken = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res
      .status(200)
      .send({ token, email: user.email, name: user?.name, id: user._id });
  })
);

export default loginRouter;
