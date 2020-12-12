const db = require(`./db/db`);
module.exports = {
    create: function (req, callback) {
        const addInfo = req.body;
        const queryInsert = `INSERT INTO customer(Name,PhoneNumber,Email,Address)
        VALUES("${addInfo.name}","${addInfo.phone}","${addInfo.email}","${addInfo.address}");`;
        db.query(queryInsert, (err, update, fields) => {
            if (err) throw err;
            callback(update)
        })
    },
    update: function (req, callback) {
        const editInfo = req.body;
        const queryUpdate = `UPDATE customer
        SET Name = "${editInfo.name}", PhoneNumber = "${editInfo.phone}",
        Email = "${editInfo.email}" , Address = "${editInfo.address}"
        WHERE CustomerID = ${editInfo.id};`;
        db.query(queryUpdate, (err, update, fields) => {
            if (err) throw err;
            callback(update)
        })
    },
    delete: function (deleteID, callback) {
        const queryDelete = ` DELETE FROM Customer WHERE CustomerID =${deleteID};`
        db.query(queryDelete, (err, deleteCus, fields) => {
            if (err) throw err;

        })
    },
    getAll: function (callback) {
        const queryClientAll = 'SELECT * FROM customer';
        db.query(queryClientAll, (err, dbClient, fields) => {
            if (err) throw err;
            callback(dbClient)
        })
    },
    getName: function (callback) {
        const queryClientName = 'SELECT customerID, name FROM customer';
        db.query(queryClientName, (err, dbClient, fields) => {
            if (err) throw err;
            callback(dbClient)
        })
    },
    count: function (callback) {
        const queryCountCustomer = "SELECT COUNT(customerId) FROM customer ;";
        db.query(queryCountCustomer, function (err, customers, fields) {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(customers)
        })
    }
}