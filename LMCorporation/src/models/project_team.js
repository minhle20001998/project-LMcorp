const db = require(`./db/db`);
module.exports = {
    deleteByProject: function (pID, callback) {
        const query = `DELETE FROM Project_team WHERE ProjectID = ${pID}`;
        db.query(query, (err, deletePT, fields) => {

        })
    },
    create: function (req, callback) {
        const editInfo = req.body;
        const queryAddEmp = `INSERT INTO project_team (projectID, employeeID)
        VALUES ("${editInfo.id}","${editInfo.EmployeeID}");
        `
        db.query(queryAddEmp, (err, update, fields) => {
            if (err) throw err;
            callback(update)
        })
    },
    deleteByEmployee: function (req, callback) {
        const queryRemoveEmp = `DELETE FROM project_team WHERE employeeID = ${editInfo.EmployeeID} `;
        db.query(queryRemoveEmp, (err, update, fields) => {
            if (err) throw err;
            callback(update)
        })
    },
}