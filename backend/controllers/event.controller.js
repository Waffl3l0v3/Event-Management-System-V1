import Event from "../models/event.model.js";
import Registration from "../models/registration.model.js";

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
        const { title, description, date, location, capacity, coverImg="" } = req.body;
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
            organiser: user._id,
            coverImg: coverImg
        });
        if (newEvent) {
            await newEvent.save();
            res.status(200).json({
                id: newEvent._id,
                title: newEvent.title,
                description: newEvent.description,
                date: newEvent.date,
                location: newEvent.location,
                capacity: newEvent.capacity,
                status: "upcoming",
                organiser: user._id,
                coverImg: coverImg
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

export const registerEvent = async (req, res) => {
    try {
        const user = req.user;
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        
        const newRegistration = new Registration({
            user_id: user._id,
            event_id: event._id,
            payment_id: 131,
            payment_status: "success",
        })
        if (newRegistration) {
            await newRegistration.save();
            return res.status(200).json({
                user_id: newRegistration.user_id,
                event_id: event._id,
                payment_id: 131,
                payment_status: "success",
            })
        }
        else { 
            return res.status(400).json({ error: "Invalid event details" });
        }
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
    }
    
};

export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        const user = req.user;
        console.log(event);
        console.log(user);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        if (event.organiser.toString() != user._id.toString()) { 
            return res.status(404).json({ message: "You are not authorized to delete this event" });
        }
        await Event.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) { 
        console.log("Error in delete event controller", error);
        res.status(500).json({ message: "Internal Server error" });
    }
    

};

export const updateEvent = async(req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        const user = req.user;
        console.log(user)
        console.log(event)
        if (event.organiser.toString() != user._id.toString()) {
            return res.status(400).json({ message: "You are not authorized to update this event" });
        };
        
        const { new_title, new_description, new_date, new_location, new_capacity, new_coverImg = "" } = req.body;
        
        const eventDate = new Date(new_date);
        const today = new Date();
        today.setHours(0,0,0,0);
        eventDate.setHours(0, 0, 0, 0);
        if (eventDate < today) { 
            return res.status(400).json({ message: "Event cannot be in the past" });
        };

        event.title = new_title || event.title;
        event.description = new_description || event.description;
        event.date = new_date || event.date;
        event.location = new_location || event.location;
        event.capacity = new_capacity || event.capacity;
        event.coverImg = new_coverImg || event.coverImg;
        await event.save()
        const data = {
            id:event._id,
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
            capacity: event.capacity,
            organiser: user._id,
            coverImg: event.coverImg
        }
        return res.status(200).json({"msg":"Event Succesfully updated", "data":data});
    }
    catch (error) { 
        console.log("Error in event update controller", error);
        return res.status(500).json({message:"Error in event update controller"});
    };
};