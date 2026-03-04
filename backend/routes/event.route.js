import express from "express";
import { create } from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";



const router = express.Router();

router.post("/register",protectRoute, create);
// router.post("/login", login);
// router.get("/logout", logout);


export default router;
