import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";

// Register user for event.
export const registerForEvent = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // check if user already registered
    const existingRegistration = await Registration.findOne({
      userId: user._id,
      eventId: event._id,
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: "User already registered for this event",
      });
    }

    if (existingRegistration && existingRegistration.status === "registered") {
      return res.status(400).json({
        message: "User already registered for this event",
      });
    }

    // check capacity
    if (event.capacity && event.registeredCount >= event.capacity) {
      const newRegistration = await Registration.create({
        userId: user._id,
        eventId: event._id,
        paymentId: 131,
        payment_status: "success",
        status: "waitlisted",
      });

      return res.status(202).json({
        message: "Event is full. Added to waitlist",
        registration: newRegistration,
      });
    }

    const newRegistration = await Registration.create({
      userId: user._id,
      eventId: event._id,
      paymentId: 131,
      payment_status: "success",
    });

    // increment event registration count
    await Event.findByIdAndUpdate(event._id, { $inc: { registeredCount: 1 } });

    return res.status(201).json({
      message: "Successfully registered",
      registration: newRegistration,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Cancel event registration. adds next user in waitlist if exists.
export const cancelRegistration = async (req, res) => {
  try {
    const user = req.user;
    const eventId = req.params.id;

    const registration = await Registration.findOneAndDelete({
      userId: user._id,
      eventId: eventId,
    });

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    await Event.findByIdAndUpdate(eventId, { $inc: { registeredCount: -1 } });

    const nextUser = await Registration.findOne({
      eventId: eventId,
      status: "waitlisted",
    }).sort({ registered_at: 1 });

    if (nextUser) {
      nextUser.status = "registered";
      await nextUser.save();
    }

    return res.status(200).json({
      message: "Registration cancelled",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

// new helper to fetch events a user has registered for
export const getUserRegistrations = async (req, res) => {
  try {
    const user = req.user;
    const registrations = await Registration.find({
      userId: user._id,
    }).populate({ path: "eventId", model: Event });

    // map to event information, you can include the registration object if needed
    const events = registrations.map((reg) => reg.eventId);
    return res.status(200).json({ events });
  } catch (error) {
    console.log("Error fetching user registrations", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all users registered for event.
export const getEventRegistrations = async (req, res) => {
  try {
    const eventId = req.params.id;

    const registrations = await Registration.find({
      eventId: eventId,
      status: "registered"
    }).populate({
      path: "userId",
      select: "name username email profileImg"
    });

    return res.status(200).json({ users: registrations });

  } catch (error) {
    console.log("Error fetching event registrations", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// returns registration status for user and event:registered, waitlisted or not registered.
export const checkRegistrationStatus = async (req, res) => {
  try {
    const user = req.user;
    const eventId = req.params.eventId;
    const registration = await Registration.findOne({
      userId: user._id,
      eventId: eventId,
    });
    if (registration && registration.status === "registered") {
      return res
        .status(200)
        .json({ registered: true, status: registration.status });
    } else {
      return res.status(200).json({
        status: registration ? registration.status : "not registered",
      });
    }
  } catch (error) {
    console.log("Error checking registration status", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
