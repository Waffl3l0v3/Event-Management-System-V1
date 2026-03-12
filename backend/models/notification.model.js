import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Fetch user notifications
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    notificationType: {
      type: String,
      enum: ["registration", "payment", "comment", "follow", "event_update"],
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },

    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    link: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Notification = new mongoose.model("Notification", notificationSchema);
export default Notification;
