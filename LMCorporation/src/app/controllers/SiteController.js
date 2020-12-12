const db = require(`../../models/db/db`);
const bcrypt = require('bcrypt');
const timeOut = 10000000;
//models
const employee_model = require(`../../models/employee_model`);
const customer_model = require(`../../models/customer_model`);
const project_model = require(`../../models/project_model`);
const profit_model = require(`../../models/profit_model`);
const user_model = require(`../../models/user_model`);
const register_model = require(`../../models/register_model`);
const project_team = require('../../models/project_team');
class NewsController {

    /*
        controller for home page
    */
    index(req, res) {
        let employCount = 0;
        let projectCount = 0;
        let customerCount = 0;
        let moneySum = 0;
        employee_model.count(function (employees) {
            project_model.count(function (projects) {
                customer_model.count(function (customers) {
                    profit_model.count(function (revenue) {
                        employCount = employees[0]['COUNT(employeeId)'];
                        projectCount = projects[0]['COUNT(projectId)'];
                        customerCount = customers[0]['COUNT(customerId)'];
                        if (revenue[0]['SUM(price)'] != null) {
                            moneySum = revenue[0]['SUM(price)'];
                        }
                        const pass = {
                            counta: `${employCount}`,
                            countb: `${projectCount}`,
                            countc: `${customerCount}`,
                            countd: `$ ${moneySum}`
                        }
                        res.render('home', pass);
                    })
                })
            }
            )
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
            user_model.getPassword(reqUsername, function (dbPassword) {
                if (bcrypt.compareSync(reqPassword, dbPassword[0]['password'])) {
                    res.cookie('name', 'login',
                        { expires: new Date(Date.now() + timeOut) });
                    res.json({
                        status: "OK",
                        redirect: "/"
                    });
                } else {
                    res.json({
                        status: "WRONG",
                    });
                }
            })
        }
    }
    //create new register
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
            const data = {
                "reqUsername": reqUsername,
                "hash": hash,
                "reqEmail": reqEmail
            }
            register_model.create(data, function (results) {
                res.json({
                    status: "success"
                });
            })
        }
    }
    //check if register name and register email are not existed in database
    registerCheck(req, res) {
        if (req.body.target == "username") {
            user_model.getName(req, function (usernamesUser) {
                register_model.getName(req, function (usernameRegister) {
                    if (usernamesUser.length == 0 && usernameRegister.length == 0) {
                        res.json({
                            check: true
                        });
                    } else {
                        res.json({
                            check: false
                        })
                    }
                })
            })
        }
        if (req.body.target == "email") {
            user_model.getEmail(req, function (emailUser) {
                register_model.getEmail(req, function (emailRegister) {
                    if (emailUser.length == 0 && emailRegister.length == 0) {
                        res.json({
                            check: true
                        });
                    } else {
                        res.json({
                            check: false
                        })
                    }
                })
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
        accept or deny register's requests
    */
    accessDecision(req, res) {
        if (req.body.decision == "accept") {
            user_model.create(req, (decisions) => {
                res.json({
                    status: "success"
                })
            })
        }
        else if (req.body.decision == "denied") {
            register_model.delete(req, (decisions) => {
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
        @return Return information of employees in database
    */
    employeeAll(req, res) {

        const queryEmployeeProjectName = `
        SELECT e.employeeID,name FROM employee AS e
        INNER JOIN project_team AS p
        ON e.employeeID = p.employeeID
        WHERE p.projectID = ${req.body.id}
        `;

        if (req.body.need == 'getAll') {
            employee_model.getAll((dbEmployees) => {
                res.json(dbEmployees);
            })
        }
        else if (req.body.need == `name all`) {
            employee_model.get_unassigned_employee((dbEmployees) => {
                res.json(dbEmployees);
            })
        }
        else if (req.body.need == `name employee pTeam`) {
            employee_model.get_assigned_employee(req, (dbEmployees) => {
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
        const queryClientName = 'SELECT customerID, name FROM customer';
        if (req.body.need == `getAll`) {
            customer_model.getAll((dbClient) => {
                res.json(dbClient);
            })
        }
        else if (req.body.need = 'name') {
            customer_model.getName((dbClient) => {
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
        const result = [];
        // if (req.body.need == `getAll`) {
        project_model.getAll((dbproject) => {
            for (let i = 0; i < dbproject.length; i++) {
                const project = dbproject[i];
                const projectID = project.ProjectID;
                employee_model.get_assigned_employee({ "body": { "id": projectID } }, (dbEmployees) => {
                    dbproject[i].employees = dbEmployees;
                    result.push(project);
                    if (result.length == dbproject.length) {
                        res.json(result);
                    }
                })
            }
        });
    }

    accessAll(req, res) {
        if (req.need = 'getAll') {
            register_model.getAll((register) => {
                res.json(register)
            })
        }
    }

    //update employee data
    employeeEdit(req, res) {
        employee_model.update(req, (update) => {
            res.json({
                status: "success"
            });
        })
    }

    clientEdit(req, res) {
        customer_model.update(req, (update) => {
            res.json({
                status: "success"
            });
        })
    }

    projectEdit(req, res) {
        const editInfo = req.body;
        if (editInfo.purpose == "edit project") {
            project_model.update(req, (update) => {
                res.json({
                    status: "success"
                });
            })
        }
        if (editInfo.purpose == "edit add employee") {
            project_team.create(req, (update) => {
                res.json({
                    status: "success"
                });
            })
        }

        else if (editInfo.purpose == "edit remove employee") {
            project_team.deleteByEmployee(req, (update) => {
                res.json({
                    status: "success"
                });
            })
        }
    }

    employeeAdd(req, res) {
        employee_model.create(req, (update) => {
            res.json({
                status: "success"
            })
        })
    }

    clientAdd(req, res) {
        customer_model.create(req, (update) => {
            res.json({
                status: "success"
            })
        })
    }

    projectAdd(req, res) {
        project_model.create(req, (insert) => {
            res.json({
                status: "success"
            })
        })
    }

    employeeDelete(req, res) {
        employee_model.delete(req, (deleteEmp) => {
            res.json({
                status: "success"
            })
        })
    }

    clientDelete(req, res) {
        const deleteID = req.body.id;
        project_model.getFromID(req, (projectIDs) => {
            for (let i = 0; i < projectIDs.length; i++) {
                const pID = projectIDs[i]["projectID"];
                project_team.deleteByProject(pID, (deletePT) => {

                })
            }
            project_model.deleteByCID(deleteID, () => { });
            customer_model.delete(deleteID, () => { });
            res.json({
                status: "success"
            })
        })

    }

    projectDelete(req, res) {
        const deleteID = req.body.id;
        project_team.deleteByProject(deleteID, (deletePT) => { })
        project_model.delete(deleteID, () => { });
        res.json({
            status: "success"
        })
    }

}

module.exports = new NewsController;