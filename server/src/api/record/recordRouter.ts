import { Router } from "express";
import recordController from "./recordController";

const router = Router();

router.get("/:email/:month", recordController.getMonthRecord);

export default router;
