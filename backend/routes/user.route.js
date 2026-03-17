import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import multer from "multer";
import {
  followUnfollowUser,
  getFollowers,
  getFollowing,
  getUserById,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/profile", protectRoute, getUserProfile);
router.patch(
  "/profile",
  protectRoute,
  upload.single("profileImg"),
  updateUserProfile,
);
// router.patch(
//   "/complete-profile",
//   protectRoute,
//   upload.single("profileImg"),
//   completeProfile,
// );

router.get("/:id", getUserById);

router.post("/follow-unfollow/:id", protectRoute, followUnfollowUser);

router.get("/followers/:id", protectRoute, getFollowers);
router.get("/following/:id", protectRoute, getFollowing);

export default router;
