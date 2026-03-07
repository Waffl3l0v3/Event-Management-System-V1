import express from "express";
import { createEvent, deleteEvent, getRegistration, updateEvent, viewEvent } from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";



const router = express.Router();

router.post("/create", protectRoute, createEvent);
router.put("/update/:id", protectRoute, updateEvent);
router.delete("/delete/:id", protectRoute, deleteEvent);
router.get("/view/:id", protectRoute, viewEvent);
router.get("/getusers/:id", protectRoute, getRegistration);
// router.post("/login", login);
// router.get("/logout", logout);


export default router;
