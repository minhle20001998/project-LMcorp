const mysql = require(`mysql`);
let instance = null;

const db = mysql.createPool({
    database: 'sad',
    host: "localhost",
    user: "root",
    password: "",
    multipleStatements: true
});

// db.connect((err) => {
//     if (err) {
//         console.log(err.message);
//     }
//     console.log("DB connected");
//     db.query("SELECT * FROM customers", function (err, result, fields) {
//         if (err) {
//             console.log(err.message);
//         };
//         console.log(result);
//     });
// })

// db.query("SELECT * FROM customers", function (err, results, fields) {
//     if (err) {
//         console.log("err:" + err.message);
//     };
//     if (!err) {
//         console.log('Results', results[0].name);
//     }
// })

module.exports = db;