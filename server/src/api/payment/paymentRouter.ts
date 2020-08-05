import { Router } from "express";
import paymentController from "./paymentController";

const router = Router();

router.get("/method/:memberNo/", paymentController.getPaymentMethod);

export default router;
