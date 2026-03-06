import express from "express";
import { createEvent, deleteEvent, updateEvent } from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";



const router = express.Router();

router.post("/create", protectRoute, createEvent);
router.put("/update/:id", protectRoute, updateEvent);
router.delete("/delete/:id", protectRoute, deleteEvent);

// router.post("/login", login);
// router.get("/logout", logout);


export default router;
