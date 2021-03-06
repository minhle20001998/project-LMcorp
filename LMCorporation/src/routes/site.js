const express = require('express');
const router = express.Router();
const db = require(`../models/db/db`);
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
router.use('/register/check', siteController.registerCheck);
router.use('/register', siteController.register);

router.use('/access/decision', checkAuthen, siteController.accessDecision);
router.use('/access/all', checkAuthen, siteController.accessAll);
router.use('/access', checkAuthen, siteController.access);

router.use('/employee/all', checkAuthen, siteController.employeeAll);
router.use('/employee/edit', checkAuthen, siteController.employeeEdit);
router.use('/employee/add', checkAuthen, siteController.employeeAdd);
router.use('/employee/delete', checkAuthen, siteController.employeeDelete);
router.use('/employee', checkAuthen, siteController.employee);

router.use('/project/all', checkAuthen, siteController.projectAll);
router.use('/project/edit', checkAuthen, siteController.projectEdit);
router.use('/project/add', checkAuthen, siteController.projectAdd);
router.use('/project/delete', checkAuthen, siteController.projectDelete);
router.use('/project', checkAuthen, siteController.project);

router.use('/client/all', checkAuthen, siteController.clientAll);
router.use('/client/edit', checkAuthen, siteController.clientEdit);
router.use('/client/add', checkAuthen, siteController.clientAdd);
router.use('/client/delete', checkAuthen, siteController.clientDelete);

router.use('/client', checkAuthen, siteController.client);
router.use('/', checkAuthen, siteController.index)
module.exports = router;