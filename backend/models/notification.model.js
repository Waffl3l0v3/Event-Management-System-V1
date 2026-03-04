import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserSchema",
            required:true
        },
        message: {
            type: String,
            required:true
        },
        isRead: {
            type: Boolean,
        },
        notification_type: {
            type: String,
            required:true
        }
    },
    {
        timestamps: true,
        versionKey: false
    },
);  

const Notification = new mongoose.model("Notification", notificationSchema);
export default Notification;