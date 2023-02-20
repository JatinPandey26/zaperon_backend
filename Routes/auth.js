import express from "express";
import {
  getMeController,
  RegisterController,
} from "../Controller/authController.js";

const router = express.Router();

router.route("/register").post(RegisterController);
router.route("/me").get(getMeController);

export default router;
