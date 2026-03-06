import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import {cancelRegistration, registerEvent, } from '../controllers/registration.controller.js'

const router = express.Router();

router.delete("/cancel/:id", protectRoute, cancelRegistration);
router.get("/register/:id", protectRoute, registerEvent);

export default router;