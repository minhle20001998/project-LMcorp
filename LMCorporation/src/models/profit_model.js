const db = require(`./db/db`);
module.exports = {
    count: function (callback) {
        const querySumMoney = "SELECT SUM(price) FROM project ;";
        db.query(querySumMoney, function (err, revenue, fields) {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(revenue)
        })
    }
}