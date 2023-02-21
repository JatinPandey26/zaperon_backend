import express from "express";
import {
  getMeController,
  logoutController,
  RegisterController,
} from "../Controller/authController.js";

const router = express.Router();

router.route("/register").post(RegisterController);
router.route("/me").get(getMeController);
router.route("/logout").get(logoutController);

export default router;
