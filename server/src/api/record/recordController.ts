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
    addRecord: async function (req: Request, res: Response, next: NextFunction) {
        const { memberNo, month } = req.params;
        const { dateText, category, paymentMethod, money, content } = req.body;
        const addedNo = await db.insertOneData(query.INSERT_RECORD_TB, [new Date(dateText), memberNo, category, paymentMethod, money, content]);
        const addedInfo = await db.selectData(query.SELECT_ONE_RECORD_TB, [addedNo]);
        res.status(200).json(addedInfo);
    },
    updateRecord: async function (req: Request, res: Response, next: NextFunction) {
        const { memberNo, month } = req.params;
        const { recordNo, dateText, category, paymentMethod, money, content } = req.body;
        const updatedNo = await db.updateOne(query.UPDATE_ONE_RECORD, [new Date(dateText), category, paymentMethod, money, content, recordNo]);
        const updatedInfo = await db.selectData(query.SELECT_ONE_RECORD_TB, [updatedNo]);
        res.status(200).json(updatedInfo);
    },
    modifyRecord: async function () { },
};
