/* eslint-disable no-unused-vars */
import Promise from 'promise';
import mysql from 'mysql';

export const DBConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4321',
    database: 'cybertraveler'
});

const queryDB = (context, sql, args) => new Promise((resolve, reject) => {
    context.db.query(sql, args, (err, rows) => {
        if (err) {
            return reject(err);
        }
        // rows is an array
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

export const getUsers = (parent, args, context, info) => {
    return queryDB(context, "SELECT id, nickname, created_at, updated_at FROM user;")
        .then((data) => data);
};

export const getUserInfo = (parent, args, context, info) => {
    return queryDB(context, "SELECT id, nickname, created_at, updated_at FROM user WHERE id = ?;", args.id)
        .then((data) => data[0]);
};
