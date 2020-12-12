const db = require(`./db/db`);
module.exports = {
    create: function (data, callback) {
        const reqUsername = data.reqUsername;
        const hash = data.hash;
        const reqEmail = data.reqEmail;
        const insertRegister = `INSERT INTO register_user(username,password,email)
        VALUES ("${reqUsername}","${hash}","${reqEmail}")`;
        db.query(insertRegister, function (err, results, fields) {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(results)
        })
    },
    delete: function (req, callback) {
        const deniedQuery = `DELETE FROM register_user WHERE register_id = ${req.body.ID};`;
        db.query(deniedQuery, (err, decisions, fields) => {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(decisions)
        })
    },
    getAll: function (callback) {
        const queryRegister = `SELECT register_id, username,email FROM register_user `;
        db.query(queryRegister, (err, register, fields) => {
            if (err) throw err;
            callback(register)
        })
    },
    getName: function (req, callback) {
        const queryUsernameRegister = `SELECT * FROM register_user  WHERE username = "${req.body.username}";`
        db.query(queryUsernameRegister, function (err, usernameRegister, fields) {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(usernameRegister)
        })
    },
    getEmail: function (req, callback) {
        const queryEmailRegister = `SELECT * FROM register_user WHERE email = "${req.body.email}"`
        db.query(queryEmailRegister, function (err, emailRegister, fields) {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(emailRegister)
        })
    }

}