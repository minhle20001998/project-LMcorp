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
router.use('/employee', checkAuthen, siteController.employee);

router.use('/', checkAuthen, siteController.index)
module.exports = router;