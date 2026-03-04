import mongoose from "mongoose";
import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
// export const routeName1= async (req, res) => {
// 	// body
// };

export const register = async (req, res) => {
    const { name, username, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    //If username already exists?
    const existingUser = await user.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ error: "Username is already taken" });
    }

    //If email already exists?
    const existingEmail = await user.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ error: "Email is already taken" });
    }

    //Password validation
    if (password.length < 8) {
        return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = new user({
        name,
        username,
        email,
        password: hashedPassword,
    });

    //Generate token and set cookie. Save user in db.
    if (newUser) {
        //generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        //Send response back to client
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
        });
    }
};
