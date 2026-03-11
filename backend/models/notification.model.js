import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index:true, // Fetch user notifications
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    notification_type: {
      type: String,
      // enum: ["payment","new_events","upcoming"],
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },

    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    link: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Notification = new mongoose.model("Notification", notificationSchema);
export default Notification;
