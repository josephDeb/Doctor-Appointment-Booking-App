import User from "../models/UserModels";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = asyncHandler(async (req, res) => {
    try {
        const {username, email, password} = req.body
        
    } catch (error) {
        return res.status(500).json("Something went wrong for creating user")
    }
})