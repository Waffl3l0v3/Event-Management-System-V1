import jwt from "jsonwebtoken";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import axios from "axios";

export const validateLocation = async (location) => {
    const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${process.env.GEOCODE_KEY}`
    );
};

export const createEvent = async (req, res) => {
    const { title, description, date, location, capacity, coverimg="" } = req.body;
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");  
    return res.status(200).json({msg:"registered for the event"});
    

};