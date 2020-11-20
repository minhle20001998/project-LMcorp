const db = require(`../../config/db/db`);
const bcrypt = require('bcrypt');
const moment = require('moment');
// const db = dbService.getDBServiceInstance();
const saltRounds = 10;
const timeOut = 10000000;
class NewsController {
    async index(req, res) {

        let employCount = 0;
        let projectCount = 0;
        let customerCount = 0;
        let moneySum = 0;
        const queryCountEmployee = "SELECT COUNT(employeeId) FROM employee  ;";
        const queryCountProject = "SELECT COUNT(projectId) FROM project ;";
        const queryCountCustomer = "SELECT COUNT(customerId) FROM customer ;";
        const querySumMoney = "SELECT SUM(price) FROM project ;";
        db.query(queryCountEmployee, function (err, employees, fields) {
            if (err) {
                console.log("err:" + err.message);
            }
            else {
                db.query(queryCountProject, function (err, projects, fields) {
                    if (err) {
                        console.log("err:" + err.message);
                    }
                    else {
                        db.query(queryCountCustomer, function (err, customers, fields) {
                            if (err) throw err;
                            else {
                                db.query(querySumMoney, function (err, revenue, fields) {
                                    if (err) throw err;
                                    employCount = employees[0]['COUNT(employeeId)'];
                                    projectCount = projects[0]['COUNT(projectId)'];
                                    customerCount = customers[0]['COUNT(customerId)'];
                                    // console.log(revenue);
                                    if (revenue[0]['SUM(price)'] != null) {
                                        moneySum = revenue[0]['SUM(price)'];
                                    }
                                    // console.log(revenue);
                                    const pass = {
                                        counta: `${employCount}`,
                                        countb: `${projectCount}`,
                                        countc: `${customerCount}`,
                                        countd: `$ ${moneySum}`
                                    }
                                    res.render('home', pass);
                                })

                            }
                        })

                    }
                }
                )
            }

        })
    }
    // news(req, res) {
    //     res.render('news');
    // }

    login(req, res) {
        // console.log(req.body);
        if (Object.keys(req.body).length === 0) {
            res.render('login', { layout: false });

        } else {
            const reqUsername = req.body.username;
            const reqPassword = req.body.password;
            // console.log(reqUsername);
            const queryPassword = "SELECT password FROM user WHERE username = 'minhle'"
            db.query(queryPassword, async (err, dbPassword, fields) => {
                // console.log(reqPassword);
                if (bcrypt.compareSync(reqPassword, dbPassword[0]['password'])) {
                    // console.log("checked");
                    res.cookie('name', 'login',
                        { expires: new Date(Date.now() + timeOut) });
                    res.json({
                        status: "OK",
                        redirect: "/"

                    });
                } else {
                    // isLogin = false;
                    // res.render('login', { layout: false, message: "* wrong password or username" });
                    res.json({
                        status: "WRONG",
                    });
                }

            })
        }

    }

    employee(req, res) {
        res.render('employee', { layout: 'staff' });
    }
    client(req, res) {
        res.render('client', { layout: 'customer' });
    }
    project(req, res) {
        res.render('project', { layout: 'project' });
    }
    //--------------------------//
    employeeAll(req, res) {
        const queryEmployee = 'SELECT * FROM employee';
        if (req.body.need == 'getAll') {
            db.query(queryEmployee, (err, dbEmployees, fields) => {
                if (err) throw err;
                // console.log(dbEmployees);
                res.json(dbEmployees);
            })
        }
    }
    clientAll(req, res) {
        console.log(req.body);
        const queryClientAll = 'SELECT * FROM customer';
        if (req.body.need == `getAll`) {
            db.query(queryClientAll, (err, dbClient, fields) => {
                if (err) throw err;
                // console.log(dbEmployees);
                console.log(dbClient);
                res.json(dbClient);
            })
        }
    }

    employeeEdit(req, res) {
        const editInfo = req.body;
        const date = new Date(editInfo.DOB).toISOString().slice(0, 19).replace('T', ' ');
        const queryUpdate = `UPDATE employee
        SET Name = "${editInfo.name}", PhoneNumber = "${editInfo.phone}",
        Email = "${editInfo.email}" , DOB = "${date}",Address = "${editInfo.address}"
        WHERE EmployeeID = ${editInfo.id};`;
        db.query(queryUpdate, (err, update, fields) => {
            if (err) throw err;
            res.json({
                status: "success"
            });
        })
    }

    employeeAdd(req, res) {
        const addInfo = req.body;
        const date = new Date(addInfo.DOB).toISOString().slice(0, 19).replace('T', ' ');
        const queryInsert = `INSERT INTO employee(Name,PhoneNumber,Email,DOB,Address)
        VALUES("${addInfo.name}","${addInfo.phone}","${addInfo.email}","${date}","${addInfo.address}");`;
        db.query(queryInsert, (err, update, fields) => {
            if (err) throw err;
            res.json({
                status: "success"
            })
        })
    }

    employeeDelete(req, res) {
        const deleteID = req.body.id;
        const queryDelete =
            `
        DELETE FROM project_team WHERE EmployeeID = ${deleteID};
        DELETE FROM performance WHERE EMployeeID = ${deleteID};
        DELETE FROM Constract WHERE EmployeeID = ${deleteID};
        DELETE FROM Employee WHERE EmployeeID =${deleteID};`;

        db.query(queryDelete, (err, deleteEmp, fields) => {
            if (err) throw err;

            res.json({
                status: "success"
            })
        })
    }





}

module.exports = new NewsController;