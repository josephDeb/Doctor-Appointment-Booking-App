import User from "../models/UserModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";

import generateToken from "../config/token.js";


const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({Status: false, Error: "Please fill all fields"})
    }
  
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({Status: false, Error: "User already exist"})
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
  
    try {
      await newUser.save();
      generateToken(res, newUser._id);
  
      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        Status: true
      });
    } catch (error) {
      return res.status(400).json({Status: false, Error: "Invalid user data"})
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (isPasswordValid) {
          generateToken(res, existingUser._id);

          res.status(201).json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
            Status: true
          });
          return;
        } else {
          return res.status(400).json({Status: false, Error: "Wrong password"})
        }
    
      } else {
        return res.status(404).json({Status: false, Error: "User not found"})
      }
})


const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
   res.clearCookie('access_token').status(200).json('Signout success!');
  return res.status(200).json({ message: "Logged out successfully" });
};

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      Status: true
    });
  } else {
    return res.status(404).json({Status: false, Error: "User not found"})
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;


    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      Status: true
    });
  } else {
    return res.status(404).json({Status: false, Error: "User not found"})
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {


    await User.deleteOne({ _id: user._id });
    return res.json({Status: true, message: "User removed"});
  } else {
    return res.status(404).json({Status: false, Error: "User not found"})
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({Status: false, Error: "User not found"})
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      Status: true
    });
  } else {
    return res.status(404).json({Status: false, Error: "User not found"})
  }
});

const signOutAdmin = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
   res.clearCookie('access_token').status(200).json('Signout success!');
  return res.status(200).json({ message: "Logged out successfully" });
};


export {createUser, loginUser, logoutUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById, signOutAdmin}