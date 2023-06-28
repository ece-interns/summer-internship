import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateTokenUser from "../utils/generateToken.user.js";

// @method POST /api/users/signup
export const signUpUser = asyncHandler(async (req, res) => {
  const { name, email, password, mobile_no } = JSON.parse(req.body);
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    mobile_no,
  });
  if (user) {
    generateTokenUser(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile_no: user.mobile_no,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @method POST /api/users/auth
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = JSON.parse(req.body);
  const user = await User.findOne({ email });
  if (user && (await user.matchPasswords(password))) {
    generateTokenUser(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile_no: user.mobile_no,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @method POST /api/users/logout
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt_user", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logged out" });
});

// @method GET /api/users
export const getUser = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    mobile_no: req.user.mobile_no,
  };
  res.status(200).json(user);
});

// @method PATCH /api/users
export const updateUser = asyncHandler(async (req, res) => {
  const userData = JSON.parse(req.body);
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = userData.name || user.name;
    user.email = userData.email || user.email;
    user.mobile_no = userData.mobile_no || user.mobile_no;

    if (userData.password) {
      user.password = userData.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile_no: updatedUser.mobile_no,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
