import express from "express";
import { googleAuth, login, logout, refreshToken, register } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protectRoute, logout);
router.post("/refresh", refreshToken);
router.post("/google", googleAuth);


export default router;
