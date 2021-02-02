import Promise from 'promise';

const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.db.query(sql, args, (err, rows) => {
        if (err) {
            return reject(err);
        }
        // rows is an array
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

export const getUsers = (args, req) => queryDB(req, "SELECT id, nickname, created_at, updated_at FROM user;").then((data) => data);
export const getUserInfo = (args, req) => queryDB(req, "SELECT id, nickname, created_at, updated_at FROM user WHERE id = ?;", args.id).then((data) => data[0]);
