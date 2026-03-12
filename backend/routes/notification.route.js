import express from "express";
import {
  createNotification,
  getUserNotifications,
  markNotificationRead,
  deleteNotificationById,
  deleteAllNotification,
  getUnreadCount
} from "../controllers/notification.controller.js";

import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getUserNotifications);
router.post("/", protectRoute, createNotification);

router.get("/unread-count", protectRoute, getUnreadCount);
router.patch("/read/:id", protectRoute, markNotificationRead);
router.delete("/:id", protectRoute, deleteNotificationById);
router.delete("/", deleteAllNotification)

export default router;