const express = require('express');
const router = express.Router();
const db = require(`../config/db/db`);
const bcrypt = require('bcrypt');

const siteController = require('../app/controllers/SiteController');
const timeOut = 10000000;
// newsController.index
//routing
// router.use('/news', siteController.news)
function checkAuthen(req, res, next) {
    // req.originalUrl

    if (req.cookies.name == "login") {
        res.cookie('name', 'login',
            { expires: new Date(Date.now() + timeOut) });
        next();
    } else {
        res.redirect("/login");
    }
}


router.use('/login', siteController.login);

router.use('/employee/all',checkAuthen,siteController.employeeAll);
router.use('/employee/edit',checkAuthen,siteController.employeeEdit);
router.use('/employee/add',checkAuthen,siteController.employeeAdd);
router.use('/employee/delete',checkAuthen,siteController.employeeDelete);
router.use('/employee', checkAuthen, siteController.employee);

router.use('/project/all',checkAuthen,siteController.projectAll);
router.use('/project',checkAuthen,siteController.project);

router.use('/client/all',checkAuthen,siteController.clientAll);
router.use('/client/edit',checkAuthen,siteController.clientEdit);
router.use('/client/add',checkAuthen,siteController.clientAdd);
router.use('/client/delete',checkAuthen,siteController.clientDelete);

router.use('/client',checkAuthen,siteController.client);
router.use('/', checkAuthen, siteController.index)
module.exports = router;