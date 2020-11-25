const db = require(`../../models/db/db`);
const bcrypt = require('bcrypt');
const moment = require('moment');
// const db = dbService.getDBServiceInstance();
const saltRounds = 10;
const timeOut = 10000000;
class NewsController {

    /*
        controller for home page
    */
    index(req, res) {

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



    /*
        controller for login page
    */
    login(req, res) {
        // console.log(req.body);
        if (Object.keys(req.body).length === 0) {
            res.render('login', { layout: false });

        } else {
            const reqUsername = req.body.username;
            const reqPassword = req.body.password;
            // console.log(reqUsername);
            const queryPassword = `SELECT password FROM user WHERE username = '${reqUsername}'`
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

    register(req, res) {
        //object key to get object length;
        if (Object.keys(req.body).length === 0) {
            res.render('register', { layout: false });

        } else {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const reqUsername = req.body.username;
            const reqPassword = req.body.password;
            const reqEmail = req.body.email;

            const hash = bcrypt.hashSync(reqPassword, salt);

            // console.log(reqUsername);
            const insertRegister = `INSERT INTO register_user(username,password,email)
             VALUES ("${reqUsername}","${hash}","${reqEmail}")`;

            db.query(insertRegister, (err, results, fields) => {
                // console.log(reqPassword);
                console.log("-----------------------");
                console.log(results);
                res.json({
                    status: "success"
                });

            })
        }

    }

    registerCheck(req, res) {
        console.log(req.body);
        if (req.body.target == "username") {
            const queryUsername = `SELECT * FROM user WHERE username = "${req.body.username}"`
            db.query(queryUsername, (err, usernames, fields) => {
                console.log(usernames);
                if (usernames.length == 0) {
                    res.json({
                        check: true
                    });
                } else {
                    res.json({
                        check: false
                    })
                }
            })
        }
        if (req.body.target == "email") {
            console.log(req.body);
            const queryEmail = `SELECT * FROM user WHERE email = "${req.body.email}"`
            db.query(queryEmail, (err, emails, fields) => {
                if (emails.length == 0) {
                    res.json({
                        check: true
                    });
                } else {
                    res.json({
                        check: false
                    })
                }
            })
        }
    }

    /*
        controller for employee page
        @effects Render employee.handlebars with staff layout
    */
    employee(req, res) {
        res.render('table', {
            layout: 'staff', title: "NHÂN VIÊN", isButton: true,
            headers: [
                { value: "ID", customClass: "title_id" },
                { value: "Tên", customClass: "title_name" },
                { value: "Số điện thoại", customClass: "title_phone" },
                { value: "Email", customClass: "title_email" },
                { value: "Ngày sinh", customClass: "title_dob" },
                { value: "Địa chỉ", customClass: "title_address" },
                { value: "Thao tác", customClass: "title_action" },
            ]
        });
    }
    /*
        controller for access page
        @effects Render access allowance page 
    */
    access(req, res) {
        res.render('table', {
            layout: 'registerAllow', title: "CẤP QUYỀN TRUY CẬP", isButton: false,
            headers: [
                { value: "ID", customClass: "title_id" },
                { value: "Username", customClass: "title_name" },
                { value: "Email", customClass: "title_email" },
                { value: "Thao tác", customClass: "title_action" }
            ]
        });
    }
    /*
    */
    accessDecision(req, res) {
        if (req.body.decision == "accept") {
            const acceptQuery = `INSERT INTO user (username,password,email)
                SELECT username,password,email FROM register_user WHERE register_id = ${req.body.ID};
                DELETE FROM register_user WHERE register_id = ${req.body.ID};
            `
            db.query(acceptQuery, (err, decisions, fields) => {
                res.json({
                    status: "success"
                })
            })
        }
        else if (req.body.decision == "denied") {
            const deniedQuery = `DELETE FROM register_user WHERE register_id = ${req.body.ID};`;
            db.query(deniedQuery, (err, decisions, fields) => {
                res.json({
                    status: "success"
                })
            })
        }
    }
    /*
        controller for customer page
        @effects Render client.handlebars with customer layout
    */
    client(req, res) {
        res.render('table', {
            layout: 'customer', title: "KHÁCH HÀNG", isButton: true,
            headers: [
                { value: "ID", customClass: "title_id" },
                { value: "Tên Khách Hàng", customClass: "title_name" },
                { value: "Số điện thoại", customClass: "title_phone" },
                { value: "Email", customClass: "title_email" },
                { value: "Địa chỉ", customClass: "title_address" },
                { value: "Thao tác", customClass: "title_action" },

            ]
        });
    }
    /*
        controller for project page
        @effects Render project.handlebars with project layout
    */
    project(req, res) {
        res.render('table', {
            layout: 'project', title: "DỰ ÁN", isButton: true,
            headers: [
                { value: "ID", customClass: "title_id" },
                { value: "Tên Dự Án", customClass: "title_name" },
                { value: "Tên Khách Hàng", customClass: "title_client" },
                { value: "Giá dự án", customClass: "title_price" },
                { value: "Thời hạn", customClass: "title_deadline" },
                { value: "Nhân viên trong đội", customClass: "title_staff" },
                { value: "Thao tác", customClass: "title_action" }

            ]
        });
    }
    //--------------------------//

    /*
        controller for employee page
        @effects provides API for website to fetch data
        @return Return all information of employees in database
    */
    employeeAll(req, res) {
        const queryEmployee = 'SELECT * FROM employee';
        const queryEmployeeName = `
        SELECT  e.employeeID,name
        FROM    employee e
        LEFT JOIN project_team p
        ON p.EmployeeID = e.EmployeeID
        WHERE p.EmployeeID IS NULL
        `;
        const queryEmployeeProjectName = `
        SELECT e.employeeID,name FROM employee AS e
        INNER JOIN project_team AS p
        ON e.employeeID = p.employeeID
        WHERE p.projectID = ${req.body.id}
        `;

        if (req.body.need == 'getAll') {
            db.query(queryEmployee, (err, dbEmployees, fields) => {
                if (err) throw err;
                // console.log(dbEmployees);
                res.json(dbEmployees);
            })
        }
        else if (req.body.need == `name all`) {
            console.log("all-------------------");

            db.query(queryEmployeeName, (err, dbEmployees, fields) => {
                if (err) throw err;
                res.json(dbEmployees);
            })
        }
        else if (req.body.need == `name employee pTeam`) {
            console.log("only-------------------");
            db.query(queryEmployeeProjectName, (err, dbEmployees, fields) => {
                if (err) throw err;
                res.json(dbEmployees);
            })
        }
    }
    /*
        controller for client page
        @effects provides API for website to fetch data
        @return Return all information of customers in database

    */
    clientAll(req, res) {
        const queryClientAll = 'SELECT * FROM customer';
        const queryClientName = 'SELECT customerID, name FROM customer';
        if (req.body.need == `getAll`) {
            db.query(queryClientAll, (err, dbClient, fields) => {
                if (err) throw err;
                // console.log(dbEmployees);
                console.log(dbClient);
                res.json(dbClient);
            })
        }
        else if (req.body.need = 'name') {
            db.query(queryClientName, (err, dbClient, fields) => {
                if (err) throw err;
                // console.log(dbEmployees);
                res.json(dbClient);
            })
        }
    }

    /*
        controller for project page
        @effects provides API for website to fetch data
        @return Return all information of projects in database

    */
    projectAll(req, res) {
        const queryProjectAll = `SELECT p.ProjectID, title,c.name,price,deadline FROM project AS p
        INNER JOIN customer AS c
        ON p.CustomerID = c.CustomerID ORDER BY ProjectID;`;
        const result = [];
        // if (req.body.need == `getAll`) {
        db.query(queryProjectAll, (err, dbproject, fields) => {
            for (let i = 0; i < dbproject.length; i++) {
                const project = dbproject[i];
                console.log(project);

                const projectID = project.ProjectID;
                const employeeQuery =
                    `SELECT e.EmployeeID, name from employee AS e 
                    INNER JOIN project_team AS p 
                    ON e.EmployeeID = p.EmployeeID 
                    WHERE projectID = ${projectID}`;
                console.log("------------------");
                db.query(employeeQuery, (err, dbEmployees, fields) => {
                    if (err) throw err;
                    console.log(project);
                    dbproject[i].employees = dbEmployees;
                    result.push(project);
                    if (result.length == dbproject.length) {

                        res.json(result);
                    }

                })
            }
        });
        // }
    }

    accessAll(req, res) {
        if (req.need = 'getAll') {
            const queryRegister = `SELECT register_id, username,email FROM register_user `;
            db.query(queryRegister, (err, register, fields) => {
                if (err) throw err;
                res.json(register)
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

    clientEdit(req, res) {
        const editInfo = req.body;
        const queryUpdate = `UPDATE customer
        SET Name = "${editInfo.name}", PhoneNumber = "${editInfo.phone}",
        Email = "${editInfo.email}" , Address = "${editInfo.address}"
        WHERE CustomerID = ${editInfo.id};`;
        db.query(queryUpdate, (err, update, fields) => {
            if (err) throw err;
            res.json({
                status: "success"
            });
        })
    }

    projectEdit(req, res) {
        const editInfo = req.body;

        if (editInfo.purpose == "add project") {
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
                res.json({
                    status: "success"
                });
            })
        }
        if (editInfo.purpose == "edit add employee") {
            const queryAddEmp = `INSERT INTO project_team (projectID, employeeID)
            VALUES ("${editInfo.id}","${editInfo.EmployeeID}");
            `
            db.query(queryAddEmp, (err, update, fields) => {
                if (err) throw err;
                res.json({
                    status: "success"
                });
            })
        }

        else if (editInfo.purpose == "edit remove employee") {
            const queryRemoveEmp = `DELETE FROM project_team WHERE employeeID = ${editInfo.EmployeeID} `;
            db.query(queryRemoveEmp, (err, update, fields) => {
                if (err) throw err;
                res.json({
                    status: "success"
                });
            })
        }
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

    clientAdd(req, res) {
        const addInfo = req.body;
        const queryInsert = `INSERT INTO customer(Name,PhoneNumber,Email,Address)
        VALUES("${addInfo.name}","${addInfo.phone}","${addInfo.email}","${addInfo.address}");`;
        db.query(queryInsert, (err, update, fields) => {
            if (err) throw err;
            res.json({
                status: "success"
            })
        })
    }

    projectAdd(req, res) {
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

    clientDelete(req, res) {
        const deleteID = req.body.id;
        const queryProjectID = `SELECT p.projectID from Project as p
        INNER JOIN Customer AS c
        ON p.customerID = c.customerID
        WHERE c.customerID = ${deleteID};
        `;
        db.query(queryProjectID, (err, projectIDs, fields) => {
            if (err) throw err;
            for (let i = 0; i < projectIDs.length; i++) {
                const pID = projectIDs[i]["projectID"];
                const query = `DELETE FROM Project_team WHERE ProjectID = ${pID}`;
                db.query(query, (err, deletePT, fields) => {

                })
            }
            const queryDelete =
                `
            DELETE FROM Project WHERE CustomerID = ${deleteID};
            DELETE FROM Customer WHERE CustomerID =${deleteID};
            `;

            db.query(queryDelete, (err, deleteCus, fields) => {
                if (err) throw err;
                res.json({
                    status: "success"
                })
            })
        })

    }

    projectDelete(req, res) {
        const deleteID = req.body.id;
        const queryDelete = `
        DELETE FROM project_team WHERE projectID = "${deleteID}";
        DELETE FROM project WHERE projectID = "${deleteID}";
        `;
        db.query(queryDelete, (err, deletePro, fields) => {
            if (err) throw err;
            res.json({
                status: "success"
            })
        })
    }









}

module.exports = new NewsController;