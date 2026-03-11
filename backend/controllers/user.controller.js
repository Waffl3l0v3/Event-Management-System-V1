import mongoose from "mongoose";
import User from "../models/user.model.js";

// Fetch logged‑in user's profile.
export const getUserProfile = async (req, res) => {
  try {
    const user = await req.user;
    return res.status(200).json({
      name: user.name,
      username: user.username,
      email: user.email,
      contact: user.contact,
      profileImg: user.profileImg,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    console.log("Error in user profile controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch another user's profile.
export const getUserById = async (req, res) => {};

// Update username, contact, profile image, etc.
export const updateUserProfile = async (req, res) => {};

// Completes profile after Google login.
export const completeProfile = async (req, res) => {
  try {
    const { username, contact } = req.body;

    const user = await User.findById(req.user.id);

    user.username = username;
    user.contact = contact;
    user.profileCompleted = true;

    await user.save();

    res.json({
      message: "Profile completed",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error completing profile" });
  }
};

// Follow another user
export const followUser = async (req, res) => {};

// Unfollow a user.
export const unfollowUser = async (req, res) => {};

// Get list of followers.
export const getFollowers = async (req, res) => {};

// Get users being followed.
export const getFollowing = async (req, res) => {};
