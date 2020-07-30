import express from "express";
import path from "path";
import loginRouter from "./login/loginRouter";
import authRouter from "./auth/authRouter";
import userRouter from "./user/userRouter";

const router = express.Router();
const PUBLIC_PATH = path.join(__dirname, "..", "public");

router.get("/", (req, res, next) => {
    res.sendFile(path.join(PUBLIC_PATH, "index.html"));
});
router.use("/login", loginRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
