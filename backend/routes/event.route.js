import express from "express";
import { createEvent, deleteEvent, registerEvent, updateEvent } from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";



const router = express.Router();

router.post("/create", protectRoute, createEvent);
router.get("/register/:id", protectRoute, registerEvent);
router.put("/update/:id", protectRoute, updateEvent);
router.get("/delete/:id", protectRoute, deleteEvent);
// router.post("/login", login);
// router.get("/logout", logout);


export default router;
