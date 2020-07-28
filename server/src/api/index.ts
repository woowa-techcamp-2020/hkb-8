import express from "express";
import path from "path";

const router = express.Router();
const PUBLIC_PATH = path.join(__dirname, "..", "public");

router.get("/", (req, res, next) => {
    res.sendFile(path.join(PUBLIC_PATH, "index.html"));
});

export default router;
