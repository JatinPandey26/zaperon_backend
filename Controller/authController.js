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
      message: "You are not logged in token not found",

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

  if(user.tokenTimeout < Date.now() - user.createdAt) {
    
  }

  req.user = user;

  return res.status(200).json({
    message: "logged in",
    isAuthenticated: true,
  });
};

// middleware
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }

  next();
};
