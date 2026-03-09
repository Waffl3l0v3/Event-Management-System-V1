import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
  viewEvent,
  deleteComment,
  addComment,
  getEventsByOrganizer,
} from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createEvent);
router.get("/", getAllEvents);

router.get("/:id", viewEvent);
router.patch("/:id", protectRoute, updateEvent);
router.delete("/:id", protectRoute, deleteEvent);

router.post("/comment/:id", protectRoute, addComment);
router.delete("/comment/:eventId/:commentId", protectRoute, deleteComment);

router.get("/organizer/:id", getEventsByOrganizer);

// router.post("/login", login);
// router.get("/logout", logout);

export default router;
