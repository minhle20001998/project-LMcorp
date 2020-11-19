const e = require("express");
const siteRouter = require('./site');
const timeOut = 10000;
function route(app) {

    // {
    //   (req, res, next) =>  const validUrl = ['/', '/employee']
    //     if (validUrl.includes(req.originalUrl)) {
    //         res.cookie('name', 'login',
    //             { expires: new Date(Date.now() + timeOut) });
    //     }

    //     console.log()
    //     next();
    // }
    app.use('/',   siteRouter);
}

module.exports = route;