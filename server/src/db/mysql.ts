import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import config from "../config";
import query from "./query";

const pool = mysql.createPool({
    host: config.host,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function insertOneData(insertQuery: string, values: any[]) {
    return await pool
        .execute<ResultSetHeader>(insertQuery, values)
        .then(([rows, fields]) => {
            if (rows.affectedRows === 0) return false;
            return true;
        });
}

async function selectData(selectQuery: string, values: any[]) {
    return await pool
        .execute<RowDataPacket[]>(selectQuery, values)
        .then(([rows, fields]) => {
            return rows;
        });
}

async function updateOne(updateQuery: string, values: any[]) {
    return await pool
        .execute<ResultSetHeader>(updateQuery, values)
        .then(([rows, fields]) => {
            if (rows.affectedRows === 0) return false;
            return true;
        });
}
async function deleteOne(deleteQuery: string, values: any[]) {
    return await pool
        .execute<ResultSetHeader>(deleteQuery, values)
        .then(([rows, fields]) => {
            if (rows.affectedRows === 0) return false;
            return true;
        });
}

async function resetTable(tableName: string) {
    const resetQuery = query.RESET_TB.replace("?", tableName);
    return await pool.execute(resetQuery);
}

function poolEnd() {
    pool.end();
}

export default {
    insertOneData,
    selectData,
    updateOne,
    deleteOne,
    resetTable,
    poolEnd,
};
