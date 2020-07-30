import mysql from "./mysql";
import query from "./query";

export default {
    async getMemberWhereEmailPassword(email: string, password: string) {
        const result = await mysql.selectData(query.SELECT_MEMBER_TB_EMAIL_PASSWORD, [
            email,
            password,
        ]);
        if (result.length == 0) return null;
        return result[0];
    },
    async getMemberWhereEmail(email: string) {
        const result = await mysql.selectData(query.SELECT_MEMBER_TB_EMAIL, [email]);
        if (result.length == 0) return null;
        return result[0];
    },
};
