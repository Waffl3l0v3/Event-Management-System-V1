import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      type: ObjectId,
      ref: "Event",
    },

    fromUser: {
      type: ObjectId,
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
