const db = require(`./db/db`);
module.exports = {
    create: function (req, callback) {
        const addInfo = req.body;
        const date = new Date(addInfo.DOB).toISOString().slice(0, 19).replace('T', ' ');
        const queryInsert = `INSERT INTO employee(Name,PhoneNumber,Email,DOB,Address)
        VALUES("${addInfo.name}","${addInfo.phone}","${addInfo.email}","${date}","${addInfo.address}");`;
        db.query(queryInsert, (err, update, fields) => {
            if (err) throw err;
            callback(update)
        })
    },
    update: function (req, callback) {
        const editInfo = req.body;
        const date = new Date(editInfo.DOB).toISOString().slice(0, 19).replace('T', ' ');
        const queryUpdate = `UPDATE employee
        SET Name = "${editInfo.name}", PhoneNumber = "${editInfo.phone}",
        Email = "${editInfo.email}" , DOB = "${date}",Address = "${editInfo.address}"
        WHERE EmployeeID = ${editInfo.id};`;
        db.query(queryUpdate, (err, update, fields) => {
            if (err) throw err;
            callback(update)
        })
    },
    delete: function (req, callback) {
        const deleteID = req.body.id;
        const queryDelete =
            `
        DELETE FROM project_team WHERE EmployeeID = ${deleteID};
        DELETE FROM performance WHERE EMployeeID = ${deleteID};
        DELETE FROM Constract WHERE EmployeeID = ${deleteID};
        DELETE FROM Employee WHERE EmployeeID =${deleteID};`;

        db.query(queryDelete, (err, deleteEmp, fields) => {
            if (err) throw err;
            callback(deleteEmp)
        })
    },
    getAll: function (callback) {
        const queryEmployee = 'SELECT * FROM employee';
        db.query(queryEmployee, (err, dbEmployees, fields) => {
            if (err) throw err;
            // console.log(dbEmployees);
            callback(dbEmployees)
        })
    },
    get_unassigned_employee: function (callback) {
        const queryEmployeeName = `
        SELECT  e.employeeID,name
        FROM    employee e
        LEFT JOIN project_team p
        ON p.EmployeeID = e.EmployeeID
        WHERE p.EmployeeID IS NULL
        `;
        db.query(queryEmployeeName, (err, dbEmployees, fields) => {
            if (err) throw err;
            callback(dbEmployees)
        })
    },
    get_assigned_employee: function (req, callback) {
        const queryEmployeeProjectName = `
        SELECT e.employeeID,name FROM employee AS e
        INNER JOIN project_team AS p
        ON e.employeeID = p.employeeID
        WHERE p.projectID = ${req.body.id}
        `;
        console.log(req.body.id);
        db.query(queryEmployeeProjectName, (err, dbEmployees, fields) => {
            if (err) throw err;
            callback(dbEmployees)
        })
    },
    count: function (callback) {
        const queryCountEmployee = "SELECT COUNT(employeeId) FROM employee  ;";
        db.query(queryCountEmployee, function (err, employees, fields) {
            if (err) {
                console.log("err:" + err.message);
            }
            callback(employees)
        })
    }
}