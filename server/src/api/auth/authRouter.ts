import { create } from "./authController";
import { Router } from "express";

const router = Router();

router.post("/tokens", create);

export default router;
