const mysql = require(`mysql`);
let instance = null;

const db = mysql.createPool({
    database: 'sad',
    host: "localhost",
    user: "root",
    password: "",
    multipleStatements: true
});
module.exports = db;