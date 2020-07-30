import { Request, Response, NextFunction } from "express";
import memberDAO from "../../db/memberDAO";

export default {
    login: async function (req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const result = await memberDAO.getMemberWhereEmailPassword(email, password);

        if (result) {
            res.json(result);
        } else {
            res.status(400).send();
        }
    },
};
