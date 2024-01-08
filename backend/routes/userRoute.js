import express from "express";

import {  createUser,deleteUserById,getAllUsers,getCurrentUserProfile,getUserById,loginUser, logoutUser, signOutAdmin, updateCurrentUserProfile, updateUserById } from "../controllers/userControllers.js";
import { authorizedAdmin, authorizedToken } from "../middlewares/authHandler.js";

const router = express.Router();

/* User Route */
router.post("/sign-up", createUser)

router.post("/sign-in", loginUser)

router.post("/sign-out", logoutUser)

router.get("/all-users", getAllUsers)


/* Admin Route */
router.get("/", getCurrentUserProfile)
router.put("/profile/:id", authorizedToken,authorizedAdmin, updateCurrentUserProfile)

router.route("/:id").delete(authorizedToken, authorizedAdmin, deleteUserById).get( getUserById).put( updateUserById)

router.post("/admin-sign-out", signOutAdmin)
export default router