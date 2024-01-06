import express from "express";
const router = express.Router();

import { authorizedAdmin, authorizedToken } from "../middlewares/authHandler.js";
import { createUser } from "../controllers/userControllers.js";

router.post("/signup", createUser)

export default router