import express from "express";
import path from "path";
import testRouter from "./login/loginRouter";

const router = express.Router();
const PUBLIC_PATH = path.join(__dirname, "..", "public");

router.get("/", (req, res, next) => {
    res.sendFile(path.join(PUBLIC_PATH, "index.html"));
});
router.use("/login", testRouter);

export default router;
