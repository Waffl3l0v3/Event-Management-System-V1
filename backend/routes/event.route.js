import express from "express";
import { register } from "../controllers/event.controller.js";



const router = express.Router();

router.post("/register", register);
// router.post("/login", login);
// router.get("/logout", logout);


export default router;
