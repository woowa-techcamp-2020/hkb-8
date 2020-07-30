import config from "../../config";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Request, Response } from "express";

export function create(req: Request, res: Response) {
    passport.authenticate("local", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: "Something is not right",
                user,
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // DTO, model 등으로 고쳐야 할 부분.
            const plainObj = JSON.parse(JSON.stringify(user));
            const token = jwt.sign(plainObj, config.jwtSecret);
            return res.json({ user, token });
        });
    })(req, res);
}
