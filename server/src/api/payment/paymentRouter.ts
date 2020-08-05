import { Router } from "express";
import paymentController from "./paymentController";

const router = Router();

router.get("/method/:memberNo/", paymentController.getPaymentMethod);
router.post("/method/:memberNo/", () => { });
router.delete("/method/:memberNo/", () => { });

export default router;
