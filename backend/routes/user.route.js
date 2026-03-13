import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { completeProfile, followUnfollowUser, getFollowers, getFollowing, getUserById, getUserProfile, updateUserProfile } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);
router.patch("/profile", protectRoute, updateUserProfile);
router.patch("/complete-profile", protectRoute, completeProfile);

router.get("/:id", getUserById);

router.post("/follow-unfollow/:id", protectRoute, followUnfollowUser);

router.get("/followers/:id", protectRoute, getFollowers);
router.get("/following/:id", protectRoute, getFollowing);


export default router;