import { Router } from "express";
import loginController from "./loginController";

const router = Router();

router.get("/", (req, res, next) => {
    res.send("hello GET: /test");
});

router.post("/member", loginController.login);

export default router;
