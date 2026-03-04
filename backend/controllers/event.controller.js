import jwt from "jsonwebtoken";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";


export const register = async (req, res) => {
    const { title, description, date, location, capacity, coverimg="" } = req.body;
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");  
    



};