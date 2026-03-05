import jwt from "jsonwebtoken";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import axios from "axios";

// export const validateLocation = async (location) => {
//   try {
//     const response = await axios.get(
//       "https://nominatim.openstreetmap.org/search",
//       {
//         params: {
//           q: location,
//           format: "json",
//           limit: 1
//         },
//         headers: {
//           "User-Agent": "event-management-app"
//         }
//       }
//     );

//     if (response.data.length === 0) {
//       return null;
//     }

//       return true;

//   } catch (error) {
//     console.log("Geocoding error:", error.message);
//     return null;
//   }
// };
export const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, capacity, coverimg="" } = req.body;
        const user = req.user;

        // const isValid = await validateLocation(location);

        // if (!isValid) {
        //     return res.status(400).json({error: "Invalid event location"});
        // }

        if (description.length<30) { 
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
        if (newEvent) {
            await newEvent.save();
            res.status(200).json({
                title: newEvent.title,
                description: newEvent.description,
                date: newEvent.date,
                location: newEvent.location,
                capacity: newEvent.capacity,
                status: "upcoming",
                organiser: user.username,
                coverimg: coverimg
            })
        }
        else { 
            res.status(400).json({ error: "Invalid event details" });
        }
    }
    catch (error) { 
        console.log("Error in create event controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const registerEvent = (req, res) => {
    
 
};