import express from "express";
import {
  getMeController,
  isAuthenticated,
  RegisterController,
} from "../Controller/authController.js"; 

const router = express.Router();

router.route("/register").post(RegisterController);
router.route("/me").get(getMeController);
router.route("/").get(isAuthenticated, (req, res) => {
  res.json({ success: "true" });
});

export default router;
