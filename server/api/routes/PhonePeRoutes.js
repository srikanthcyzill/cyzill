// paymentRoutes.js

import { Router } from "express";
const router = Router();
import { initiatePayment, validatePayment } from "../controllers/PhonePeController.js";

router.post("/pay", initiatePayment);
router.get("/pay", initiatePayment);
router.get("/payment/validate/:merchantTransactionId", validatePayment);

export default router;
