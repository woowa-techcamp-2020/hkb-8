import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Router } from "express";
const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), function (req, res) {
    res.json(req.user);
});

export default router;
