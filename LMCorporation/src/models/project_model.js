const db = require(`./db/db`);
module.exports = {
    create: function (req, callback) {
        const addInfo = req.body;
        const date = new Date(addInfo.deadline).toISOString().slice(0, 19).replace('T', ' ');
        let price = addInfo.price;
        if ((price).includes("$")) {
            price = price.substring(1, price.length);
        } else {
            price = addInfo.price;
        }
        const queryInsert = `INSERT INTO project(Deadline,Price,Title,CustomerID) VALUES
        ("${date}","${price}","${addInfo.title}","${addInfo.CustomerID}");
        `
        db.query(queryInsert, (err, insert, fields) => {
            if (err) throw err;
            callback(insert);
        })
    },
    update: function (req, callback) {
        const editInfo = req.body;
        const date = new Date(editInfo.deadline).toISOString().slice(0, 19).replace('T', ' ');
        let price = editInfo.price;
        if ((price).includes("$")) {
            price = price.substring(1, price.length);
        } else {
            price = editInfo.price;
        }
        const queryUpdate = `UPDATE project
    SET Deadline = "${date}", Price = "${price}"
    ,Title = "${editInfo.title}",CustomerID = "${editInfo.CustomerID}"
    WHERE ProjectID = ${editInfo.id}
    `
        db.query(queryUpdate, (err, update, fields) => {
            if (err) throw err;
            callback(update)
        })
    },
    delete: function (deleteID, callback) {
        const queryDelete = `DELETE FROM project WHERE projectID = "${deleteID}";`
        console.log(queryDelete);
        db.query(queryDelete, (err, deleteProject, fields) => {
            if (err) throw err;
        })
    },
    deleteByCID: function (deleteID, callback) {
        const queryDelete =
            `DELETE FROM Project WHERE CustomerID = ${deleteID};`
        db.query(queryDelete, (err, deleteCus, fields) => {
            if (err) throw err;

        })
    },
    //--------------------
   
    
    //--------------------
    getAll: function (callback) {
        const queryProjectAll = `SELECT p.ProjectID, title,c.name,price,deadline FROM project AS p
        INNER JOIN customer AS c
        ON p.CustomerID = c.CustomerID ORDER BY ProjectID;`;
        db.query(queryProjectAll, (err, dbproject, fields) => {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(dbproject);
        })
    },
    //--------------------
    getFromID: function (req, callback) {
        const deleteID = req.body.id;
        const queryProjectID = `SELECT p.projectID from Project as p
        INNER JOIN Customer AS c
        ON p.customerID = c.customerID
        WHERE c.customerID = ${deleteID};
        `;
        db.query(queryProjectID, (err, projectIDs, fields) => {
            if (err) throw err;
            callback(projectIDs)
        })
    },
    //--------------------
    count: function (callback) {
        const queryCountProject = "SELECT COUNT(projectId) FROM project ;";
        db.query(queryCountProject, function (err, projects, fields) {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(projects)
        })
    }
}