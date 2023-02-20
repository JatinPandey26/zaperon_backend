import express from "express";
import { connect } from "./config/database.js";
import dotenv from "dotenv";
import router from "./Routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

dotenv.config({
  path: "./config/config.env",
});

// using middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connect();

app.use("/api/v1/", router);

app.use("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});
app.listen(5000, () => {
  console.log("Example app listening on port 5000");
});
