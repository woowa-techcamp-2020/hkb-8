import { Router } from "express";
import recordController from "./recordController";

const router = Router();

router.get("/:email/:month", recordController.getMonthRecord);
router.post("/:memberNo/:month", recordController.addRecord);  // 개별 내역 추가
router.put("/:memberNo/:month", recordController.updateRecord);  // 개별 내역 추가
router.delete("/:memberNo/:recordNo", recordController.deleteRecord);  // 개별 내역 추가

export default router;
