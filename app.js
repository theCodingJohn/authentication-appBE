import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import logger from "./utils/logger.js";
import config from "./utils/config.js";
import middleware from "./utils/middleware.js";

// Router
import usersRouter from "./controllers/user.controller.js";
import loginRouter from "./controllers/login.controller.js";
import registerRouter from "./controllers/register.controller.js";

const app = express();

const mongoUrl = config.MONGODB_URI;

logger.info("Connecting to DB...");
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("Connected to DB");
  })
  .catch((error) => {
    logger.info("Connection Error", error);
  });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/users", registerRouter);
app.use("/users", loginRouter);

app.use(middleware.checkAuth);
app.use("/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
