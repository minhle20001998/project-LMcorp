const db = require(`./db/db`);
module.exports = {
    create: function (req, callback) {
        const acceptQuery = `INSERT INTO user (username,password,email)
        SELECT username,password,email FROM register_user WHERE register_id = ${req.body.ID};
        DELETE FROM register_user WHERE register_id = ${req.body.ID};`
        db.query(acceptQuery, (err, decisions, fields) => {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(decisions)
        })
    },
    getPassword: function (reqUsername, callback) {
        const queryPassword = `SELECT password FROM user WHERE username = '${reqUsername}'`
        db.query(queryPassword, function (err, dbPassword, fields) {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(dbPassword)
        })
    },
    getName: function (req, callback) {
        const queryUsernameUser = `SELECT * FROM user WHERE username = "${req.body.username}";`
        db.query(queryUsernameUser, function (err, usernamesUser, fields) {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(usernamesUser)
        })
    },
    getEmail: function (req, callback) {
        const queryEmailUser = `SELECT * FROM user WHERE email = "${req.body.email}"`
        db.query(queryEmailUser, function (err, emailUser, fields) {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(emailUser)
        })
    }
}