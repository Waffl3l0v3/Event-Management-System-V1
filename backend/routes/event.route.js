import express from "express";
import { createEvent } from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";



const router = express.Router();

router.post("/register",protectRoute, createEvent);
// router.post("/login", login);
// router.get("/logout", logout);


export default router;
