const CREATE_DB = `CREATE DATABASE IF NOT EXISTS account_book;`;

// ================================== member_tb =========================
const CREATE_MEMBER_TB = `
    CREATE TABLE IF NOT EXISTS member_tb (
        no INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        salt VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(no)
    );
`;

const INSERT_MEMBER_TB = `INSERT INTO member_tb(email, password, salt) VALUES(?, ?, ?);`;

const INSERT_MEMBER_TB_DELETED = `INSERT INTO member_tb(email, password, salt, is_deleted) VALUES(?, ?, ?, true);`;

const SELECT_MEMBER_TB_EMAIL = `select * from member_tb where email = ?;`;
const SELECT_MEMBER_TB_EMAIL_PASSWORD = `select * from member_tb where email = ? and password = ?;`;
// ================================== payment_method_tb =========================
const CREATE_PAYMENT_METHOD_TB = `
    CREATE TABLE IF NOT EXISTS payment_method_tb (
        no INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        is_deleted BOOLEAN DEFAULT false,
        member_no INT NOT NULL,
        PRIMARY KEY(no),
        FOREIGN KEY(member_no) REFERENCES member_tb(no)
    );
`;

const INSERT_PAYMENT_METHOD_TB = `INSERT INTO payment_method_tb(name, member_no) VALUES(?, ?);`;

const SELECT_PAYMENT_METHOD_TB = `select no, name as paymentMethodName from payment_method_tb where member_no = ? and is_deleted = 0`;

// ================================== category_tb =========================
const CREATE_CATEGORY_TB = `
    CREATE TABLE IF NOT EXISTS category_tb (
        no INT NOT NULL AUTO_INCREMENT,
        type VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        is_deleted BOOLEAN DEFAULT false,
        PRIMARY KEY(no)
    );
`;

const INSERT_CATEGORY_TB = `INSERT INTO category_tb(type, name) VALUES(?, ?)`;

// ================================== record_tb =========================
const CREATE_RECORD_TB = `
    CREATE TABLE IF NOT EXISTS record_tb (
        no INT NOT NULL AUTO_INCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        payment_at DATETIME NOT NULL,
        member_no INT NOT NULL,
        category_no INT NOT NULL,
        payment_method_no INT NOT NULL,
        money INT NOT NULL,
        content VARCHAR(255) NOT NULL,
        is_deleted BOOLEAN DEFAULT false,
        PRIMARY KEY(no),
        FOREIGN KEY(member_no) REFERENCES member_tb(no),
        FOREIGN KEY(category_no) REFERENCES category_tb(no),
        FOREIGN KEY(payment_method_no) REFERENCES payment_method_tb(no)
    );
`;
const SELECT_ONE_RECORD_TB = `
    SELECT 
        no as recordNo, payment_at as paymentAt, category_no as categoryNo, 
        payment_method_no as paymentMethodNo, money, content 
    FROM record_tb WHERE no=? and is_deleted = 0;
`;
const INSERT_RECORD_TB = `
    INSERT INTO record_tb(payment_at, member_no, category_no, payment_method_no, money, content) 
    VALUES(?, ?, ?, ?, ?, ?);`;
const UPDATE_RECORD_TB = `
    UPDATE record_tb
    SET payment_at=?, member_no=?, category_no=?, payment_method_no=?, money=?, content=?, is_deleted=?
    where no = ?;
`;

const SELECT_RECORD_INFO = `
    select 
        payment_at as paymentAt,
        record_tb.no as recordNo,
        member_tb.email,  member_tb.no AS memberNo,
        category_tb.type as categoryType, category_tb.name as categoryName, category_tb.no as categoryNo,
        payment_method_tb.name as paymentName, payment_method_tb.no as paymentMethodNo,
        money, content 
    from record_tb
        INNER JOIN member_tb on record_tb.member_no = member_tb.no
        inner join payment_method_tb on payment_method_tb.no = record_tb.payment_method_no
        inner join category_tb on category_tb.no = record_tb.category_no
    where member_tb.email = ? 
        AND record_tb.is_deleted = 0
        AND category_tb.is_deleted = 0
        AND payment_method_tb.is_deleted = 0
        AND month(record_tb.payment_at) = ?
    order by record_tb.payment_at desc;
`;

const RESET_TB = `delete from ?`;

const UPDATE_ONE_RECORD = `
    UPDATE record_tb 
    SET payment_at=?, category_no=?, payment_method_no=?, money=?, content=?
    WHERE no = ?;
`;

const DELETE_ONE_RECORD = `
    UPDATE record_tb
    SET is_deleted=1
    where no = ?
`;

export default {
    CREATE_DB,
    CREATE_MEMBER_TB,
    INSERT_MEMBER_TB,
    INSERT_MEMBER_TB_DELETED,
    SELECT_MEMBER_TB_EMAIL,
    SELECT_MEMBER_TB_EMAIL_PASSWORD,
    CREATE_PAYMENT_METHOD_TB,
    INSERT_PAYMENT_METHOD_TB,
    SELECT_PAYMENT_METHOD_TB,
    CREATE_CATEGORY_TB,
    INSERT_CATEGORY_TB,
    CREATE_RECORD_TB,
    INSERT_RECORD_TB,
    SELECT_RECORD_INFO,
    SELECT_ONE_RECORD_TB,
    RESET_TB,
    UPDATE_ONE_RECORD,
    DELETE_ONE_RECORD,
};
