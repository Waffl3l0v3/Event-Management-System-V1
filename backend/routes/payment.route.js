import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentStatus,
  refundPayment
} from "../controllers/payment.controller.js";

import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create-order", protectRoute, createPaymentOrder);
router.post("/verify", protectRoute, verifyPayment);
router.get("/status/:id", protectRoute, getPaymentStatus);
router.post("/refund/:id", protectRoute, refundPayment);

export default router;