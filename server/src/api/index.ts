import express from "express";
import path from "path";
import loginRouter from "./login/loginRouter";
import authRouter from "./auth/authRouter";
import userRouter from "./user/userRouter";
import transactionRouter from "./record/recordRouter";

const router = express.Router();
const PUBLIC_PATH = path.join(__dirname, "..", "public");

router.get("/", (req, res, next) => {
    res.sendFile(path.join(PUBLIC_PATH, "index.html"));
});
router.use("/api/login", loginRouter);
router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api/transaction", transactionRouter);

export default router;
