import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";

export const registerEvent = async (req, res) => {
  try {
    const user = req.user;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // check if user already registered
    const existingRegistration = await Registration.findOne({
      user_id: user._id,
      event_id: event._id,
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: "User already registered for this event",
      });
    }

    // check capacity
    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({
        message: "Event is full",
      });
    }

    const newRegistration = await Registration.create({
      user_id: user._id,
      event_id: event._id,
      payment_id: 131,
      payment_status: "success",
    });

    // increment event registration count
    await Event.findByIdAndUpdate(event._id, { $inc: { registeredCount: 1 } });

    return res.status(201).json({
      message: "Successfully registered",
      registration: newRegistration,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const user = req.user;
    const eventId = req.params.id;

    const registration = await Registration.findOneAndDelete({
      user_id: user._id,
      event_id: eventId,
    });

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    await Event.findByIdAndUpdate(eventId, { $inc: { registeredCount: -1 } });

    return res.status(200).json({
      message: "Registration cancelled",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};


