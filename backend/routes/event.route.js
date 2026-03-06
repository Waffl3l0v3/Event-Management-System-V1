import express from "express";
import { cancelRegistration, createEvent, deleteEvent, registerEvent, updateEvent } from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";



const router = express.Router();

router.post("/create", protectRoute, createEvent);
router.put("/update/:id", protectRoute, updateEvent);
router.delete("/delete/:id", protectRoute, deleteEvent);

// should be in registraion?
router.delete("/cancel/:id", protectRoute, cancelRegistration);
router.post("/register/:id", protectRoute, registerEvent);

// router.post("/login", login);
// router.get("/logout", logout);


export default router;
