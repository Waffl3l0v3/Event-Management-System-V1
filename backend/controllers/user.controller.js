import mongoose from 'mongoose';
import User from '../models/user.model.js';

export const userProfile = async (req, res) => {
    try {
        const user = await req.user;
        return res.status(200).json({
            name:user.name,
            username: user.username,
            email: user.email,
            contact: user.contact,
            profileImg: user.profileImg,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
        })
    }
    catch (error) {
        console.log("Error in user profile controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });

    }
};