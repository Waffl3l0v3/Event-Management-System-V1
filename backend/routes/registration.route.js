import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  cancelRegistration,
  registerForEvent,
  getUserRegistrations,
  getEventRegistrations,
  checkRegistrationStatus
} from "../controllers/registration.controller.js";

const router = express.Router();

router.delete("/:id", protectRoute, cancelRegistration);
router.post("/:id", protectRoute, registerForEvent);

// get all events the authenticated user has registered for
router.get("/me", protectRoute, getUserRegistrations);

// Gets all users registered for an event.
router.get("/event/:id", protectRoute, getEventRegistrations);

router.get("/check/:id", protectRoute, checkRegistrationStatus);

export default router;
