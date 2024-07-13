import { Router } from "express";
const router = Router();
import { initiatePayment, validatePayment } from "../controllers/PhonePeController.js";

router.post("/payment", initiatePayment);
router.get("/payment/validate/:merchantTransactionId", validatePayment);

export default router;
