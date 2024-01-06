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
  

export {createUser}