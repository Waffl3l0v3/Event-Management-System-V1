import express from "express";
import {
  createNotification,
  getUserNotifications,
  markNotificationRead,
  deleteNotificationById,
  deleteAllNotification
} from "../controllers/notification.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getUserNotifications);
router.post("/", protectRoute, createNotification);

router.patch("/read/:id", protectRoute, markNotificationRead);
router.delete("/:id", protectRoute, deleteNotificationById);
router.delete("/", deleteAllNotification)

export default router;