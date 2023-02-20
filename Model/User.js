import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, validate: validator.isEmail },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  tokenTimeout: { type: Number, default: 1 * 24 * 60 * 60 * 1000 },
});

UserSchema.pre("save", async function (next) { 
  if (!this.isModified("password")) return next(); 

  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.getJWTToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", UserSchema);
