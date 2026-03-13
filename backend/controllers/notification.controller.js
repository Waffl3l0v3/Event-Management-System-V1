import Notification from "../models/notification.model.js";

// Create notification for user.
export const createNotification = async ({
  userId,
  message,
  notificationType,
  eventId = null,
  fromUserId = null,
  link = null,
}) => {
  try {
    const notification = await Notification.create({
      userId,
      message,
      notificationType,
      eventId,
      fromUserId,
      link,
    });

    return notification;
  } catch (error) {
    console.log("Error creating notification", error);
  }
};

// Fetch logged‑in user's notifications.
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user;

    const notifications = await Notification.find({ userId })
      .populate({
        path: "fromUserId",
        select: "username profileImg",
      })
      .sort({ createdAt: -1 });

    await Notification.updateMany({ userId, isRead: false }, { isRead: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Mark notification as read.
export const markNotificationRead = async (req, res) => {
  try {

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.status(200).json(notification);

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete specific notification.
export const deleteNotificationById = async (req, res) => {
  try {

    await Notification.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Notification deleted" });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete all notifications of user
export const deleteAllNotification = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get count of unread notifications for badge
export const getUnreadCount = async (req, res) => {
  const userId = req.user;

  const count = await Notification.countDocuments({
    userId,
    isRead: false,
  });

  res.json({ count });
};
