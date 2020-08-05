import { Request, Response, NextFunction } from "express";
import query from "../../db/query";
import db from "../../db/mysql";

export default {
    getPaymentMethod: async function (req: Request, res: Response, next: NextFunction) {
        const { memberNo } = req.params;
        const records = await db.selectData(query.SELECT_PAYMENT_METHOD_TB, [memberNo]);
        res.status(200).json(records);
    }
};
