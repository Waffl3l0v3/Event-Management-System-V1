import express from "express";
import { login, logout, refreshToken, register } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/refresh", refreshToken);


export default router;
