import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { completeProfile, followUser, getFollowers, getFollowing, getUserById, getUserProfile, unfollowUser, updateUserProfile } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);
router.patch("/profile", protectRoute, updateUserProfile);
router.patch("/complete-profile", protectRoute, completeProfile);

router.get("/:id", getUserById);

router.post("/follow-unfollow/:id", protectRoute, followUser);
//router.post("/unfollow/:id", protectRoute, unfollowUser);

router.get("/followers/:id", getFollowers);
router.get("/following/:id", getFollowing);


export default router;