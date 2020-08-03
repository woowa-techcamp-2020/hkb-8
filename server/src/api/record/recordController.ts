import { Request, Response, NextFunction } from "express";
import query from "../../db/query";
import db from "../../db/mysql";

export default {
    getMonthRecord: async function (req: Request, res: Response, next: NextFunction) {
        const { email, month } = req.params;
        const records = await db.selectData(query.SELECT_RECORD_INFO, [email, month]);
        console.log(records);
        res.status(200).json(records);
    },
    addRecord: async function () {},
    modifyRecord: async function () {},
};
