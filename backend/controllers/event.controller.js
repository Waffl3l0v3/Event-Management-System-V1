import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import { createNotification } from "./notification.controller.js";

// Create a new event.
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, price, capacity } = req.body;
    let { coverImg } = req.body;
    const user = req.user;

    if (user.role != "organizer") {
      return res.status(403).json({
        message: "Log in with organizer account to create and event!",
      });
    }

    if (description.length < 30) {
      return res
        .status(400)
        .json({ error: "Description length should be minimum 30 characters" });
    }

    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate < today) {
      return res
        .status(400)
        .json({ error: "Event date cannot be in the past" });
    }

    if (!capacity) capacity = "none";

    if (coverImg) {
      const uploadedResponse = await cloudinary.uploader.upload(coverImg, {
        folder: "event_cover_images",
      });
      coverImg = uploadedResponse.secure_url;
    }

    const newEvent = Event({
      title,
      description,
      date,
      location,
      price,
      capacity,
      status: "upcoming",
      organizer: user._id,
      coverImg: coverImg,
    });
    if (newEvent) {
      await newEvent.save();
      res.status(200).json({
        id: newEvent._id,
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        location: newEvent.location,
        price: newEvent.price,
        capacity: newEvent.capacity,
        status: "upcoming",
        organizer: user._id,
        coverImg: coverImg,
      });
      const attendees = await User.find({
        role: "attendee",
      });

      for (const attendee of attendees) {
        await createNotification({
          userId: attendee._id,
          notificationType: "event_update",
          message: `Hey ${attendee.username}, ${user.username} just created an event. Check it out!`,
          fromUserId: user._id,
          // link:`/events/${newEvent._id}`
        });
      }
    } else {
      res.status(400).json({ error: "Invalid event details" });
    }
  } catch (error) {
    console.log("Error in create event controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// cancel event
export const cancelEvent = async (req, res) => {
  try {
    const user = req.user;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.organizer.toString() !== user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to cancel this event",
      });
    }

    if (event.status === "cancelled") {
      return res.status(400).json({
        message: "Event is already cancelled",
      });
    }

    event.status = "cancelled";
    await event.save();

    return res.status(200).json({
      message: "Event cancelled successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error cancelling event",
    });
  }
};

// Delete an event.
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = req.user;
    // console.log(event);
    // console.log(user);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.organizer.toString() != user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this event" });
    }

    if (event.status != "cancelled") {
      return res
        .status(409)
        .json({ message: "Please cancel event before deleting" });
    }
    await Event.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("Error in delete event controller", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Update event details.
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = req.user;
    // console.log(user);
    // console.log(event);
    if (event.organizer.toString() != user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You are not authorized to update this event" });
    }

    const {
      new_title,
      new_description,
      new_date,
      new_location,
      new_price,
      new_capacity,
      new_coverImg = "",
    } = req.body;

    const eventDate = new Date(new_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    if (eventDate < today) {
      return res.status(400).json({ message: "Event cannot be in the past" });
    }
    if (description.length < 30) {
      return res
        .status(400)
        .json({ error: "Description length should be minimum 30 characters" });
    }

    event.title = new_title || event.title;
    event.description = new_description || event.description;
    event.date = new_date || event.date;
    event.location = new_location || event.location;
    event.price = new_price || event.price;
    event.capacity = new_capacity || event.capacity;

    if (coverImg) {
      // destroy old image
      if (user.coverImg) {
        const publicId = user.coverImg
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      }

      // upload new image
      const uploadedResponse = await cloudinary.uploader.upload(coverImg, {
        folder: "event_cover_images",
      });
      user.coverImg = uploadedResponse.secure_url;
    }

    await event.save();
    const data = {
      id: event._id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      price: event.price,
      capacity: event.capacity,
      organizer: user._id,
      coverImg: event.coverImg,
    };

    const attendees = await Registration.find({
      eventId: event._id,
      status: "registered",
    });

    for (const reg of attendees) {
      await createNotification({
        userId: reg.userId,
        notificationType: "event_update",
        message: `Event ${event.title} was updated`,
        eventId: event._id,
        // link:`/event/${event._id}`
      });
    }

    return res
      .status(200)
      .json({ msg: "Event Succesfully updated", data: data });
  } catch (error) {
    console.log("Error in event update controller", error);
    return res
      .status(500)
      .json({ message: "Error in event update controller" });
  }
};

// Fetch event details.
export const viewEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event doesn't exist" });
    }
    const now = new Date();
    if (event.date > now && event.status !== "completed") {
      event.status = "completed";
      await event.save();
    }
    return res.status(200).json({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      capacity: event.capacity,
      registeredCount: event.registeredCount,
      status: event.status,
      price: event.price,
      organizer: event.organizer,
      coverImg: event.coverImg,
    });
  } catch (error) {
    console.log("Error in view event controller");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch events created by a specific organizer.
export const getEventsByOrganizer = async (req, res) => {
  try {
    // organizer should only see events they created
    // prefer using authenticated user instead of passing id in params
    const userId = req.user ? req.user._id : req.params.orgId;
    const events = await Event.find({ organizer: userId });
    return res.status(200).json({ events });
  } catch (error) {
    console.log("Error in getMyEvents controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch all events.
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    //console.log(events);
    const today = new Date();
    for (let i = 0; i < events.length; i++) {
      if (events[i].date > today && events[i].status !== "completed") {
        events[i].status = "completed";
        await events[i].save();
      }
    }
    return res.status(200).json({ events: events });
  } catch (error) {
    console.log(error);
    console.log("error in get all events controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

// add comment to event
export const addComment = async (req, res) => {
  try {
    const user = req.user;
    const { eventId } = req.params;
    const { text } = req.body;

    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        $push: {
          comments: {
            user: user._id,
            text: text,
          },
        },
      },
      { new: true },
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // create notification for organizer
    if (event.organiser.toString() !== user._id.toString()) {
      await createNotification({
        userId: event.organiser,
        message: `${user.username} commented on your event`,
        notificationType: "comment",
        eventId: event._id,
        fromUserId: user._id,
        // link: `/events/${event._id}`,
      });
    }

    return res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.log("Error adding comment", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// delete commenet from event
export const deleteComment = async (req, res) => {
  const user = req.user;
  const { eventId, commentId } = req.params;

  const event = await Event.findById(eventId);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const comment = event.comments.id(commentId);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  await Event.findByIdAndUpdate(eventId, {
    $pull: {
      comments: { _id: commentId },
    },
  });
  const msg = `comment no ${commentId} for event no ${eventId} deleted by ${user.username}`;
  console.log(msg);

  return res.status(200).json({ message: "comment deleted successfully" });
};

// like/unlike someone's comment
export const likeUnlikeComment = async (req, res) => {
  try {
    const user = req.user;
    const { eventId, commentId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const comment = event.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const alreadyLiked = comment.likes.some(
      (id) => id.toString() === user._id.toString(),
    );

    if (alreadyLiked) {
      // unlike
      comment.likes.pull(user._id);
    } else {
      // like
      comment.likes.push(user._id);

      // don't notify yourself
      if (comment.user.toString() !== user._id.toString()) {
        await createNotification({
          userId: comment.user,
          type: "like",
          message: `${user.username} liked your comment!`,
          fromUserId: user._id,
          eventId: event._id,
        });
      }
    }

    await event.save();

    return res.status(200).json({
      message: alreadyLiked ? "Comment unliked" : "Comment liked",
      likesCount: comment.likes.length,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating like" });
  }
};

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
