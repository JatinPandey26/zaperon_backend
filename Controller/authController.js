import { User } from "../Model/User.js";
import { sendToken } from "../utils/sendToken.js";
import jwt from "jsonwebtoken";

export const RegisterController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  let user = await User.findOne({
    email: email,
  });
  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  user = await User.create({
    email,
    password,
  });

  sendToken(user, "Welcome ", res);
};

export const getMeController = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "You are not logged in - token not found or token expired  ",
      isAuthenticated: false,
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded._id);

  if (!user) {
    return res.status(401).json({
      message: "not logged in",
      isAuthenticated: false,
    });
  }

  const timeSpent = new Date().getTime() - user.createdAt.getTime();

  if (user.tokenTimeoutInMilliseconds < timeSpent) {
    await user.delete();
    return res.clearCookie("token").status(401).json({
      message: "You are not logged in - token not found or token expired",

      isAuthenticated: false,
    });
  }

  req.user = user;

  return res.status(200).json({
    message: "logged in",
    isAuthenticated: true,
    user: user.email.split("@")[1],
  });
}; 
