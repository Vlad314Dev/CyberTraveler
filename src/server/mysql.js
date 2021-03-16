/* eslint-disable no-unused-vars */
import mysql from 'mysql';
import Promise from 'promise';

const DBConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4321',
    database: 'cybertraveler'
});

const queryDB = (context, sql, args) => new Promise((resolve, reject) => {
    context.db.query(sql, args, (err, result) => {
        if (err) {
            return reject(err);
        }
        // result is an array
        result.changedRows || result.affectedRows || result.insertId ? resolve(true) : resolve(result);
    });
});

export const getUsers = (parent, args, context, info) => {
    return queryDB(context, "SELECT id, nickname, created_at, updated_at FROM user;")
        .then((result) => result);
};

export const getUserInfo = (parent, args, context, info) => {
    return queryDB(context, "SELECT id, nickname, created_at, updated_at FROM user WHERE id = ?;", args.id)
        .then((result) => result[0]);
};

export const getLeaderboard = (parent, args, context, info) => {
    return queryDB(context, "SELECT ld.nickname AS nickname, ld.score AS score, ld.created_at AS created_at \
    FROM leaderboard as ld \
    ORDER BY ld.score DESC \
    LIMIT 10;")
        .then((result) => result);
};

export const signUp = (parent, args, context, info) => {
    return queryDB(context, "INSERT INTO user (nickname, password) VALUES (?, ?);", [args.nickname, args.password])
        .then((result) => result);
};

export const logIn = (parent, args, context, info) => {
    return queryDB(context, "SELECT id FROM user WHERE nickname = ? AND password = ?;", [args.nickname, args.password])
        .then((result) => result[0]);
};

export default DBConnection;
