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

    employeeAll(req, res) {
        const queryEmployee = 'SELECT * FROM employee';
        if (req.body.need == 'getAll') {
            db.query(queryEmployee, (err, dbEmployees, fields) => {
                if (err) throw err;
                // console.log(dbEmployees);
                console.log(dbEmployees);
                res.json(dbEmployees)
            })
        }
    }

    employeeEdit(req, res) {
        const update = req.body;
        const date = new Date(update.DOB).toISOString().slice(0, 19).replace('T', ' ');;
        console.log("--------------------");

        console.log(date);
        console.log(date);
        const queryUpdate = `UPDATE employee
        SET Name = "${update.name}", PhoneNumber = "${update.phone}",
        Email = "${update.email}" , DOB = "${date}",Address = "${update.address}"
        WHERE EmployeeID = ${update.id};`;
        console.log("--------------------");
        console.log(queryUpdate);
        db.query(queryUpdate, (err, update, fields) => {
            if (err) throw err;
            res.json({
                status: "success"
            });
        })
    }



}

module.exports = new NewsController;