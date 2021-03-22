import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import logger from "./utils/logger.js";
import config from "./utils/config.js";
import middleware from "./utils/middleware.js";

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
app.use(express.json());

app.use("/", async (req, res) => {
  res.send("Hello, World");
});

app.use(middleware.errorHandler);

export default app;
