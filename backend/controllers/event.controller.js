import jwt from "jsonwebtoken";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import axios from "axios";

export const validateLocation = async (location) => {
    const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${process.env.GEOCODE_KEY}`
    );

    if (response.data.results.length === 0) {
        return false;
    }

    return true;
    };
export const create = async (req, res) => {
    try {
        const { title, description, date, location, capacity, coverimg="" } = req.body;
        const user = req.user;

        const isValid = await validateLocation(req.body.location);

        if (!isValid) {
            return res.status(400).json({error: "Invalid event location"});
        }

        if (description.length) { 
            return res.status(400).json({ error: "Description length should be minimum 30 characters" });
        }

        const eventDate = new Date(date);
        const today = new Date();
        today.setHours(0,0,0,0);
        eventDate.setHours(0, 0, 0, 0);
        
        if (eventDate < today) { 
            return res.status(400).json({ error: "Event date cannot be in the past" });
        }

        if (!capacity) capacity = "none";
        

        const newEvent = Event({
            title,
            description,
            date,
            location,
            capacity,
            status: "upcoming",
            organiser: user.username,
            coverimg: coverimg
        });
        res.status(200).json({
            "msg": "event registered",
            "decoded": decoded,
        })
    }
    catch (error) { }



};