const express = require('express');
const morgan = require(`morgan`);
const handlebars = require(`express-handlebars`);
const app = express();
const cookieParser = require(`cookie-parser`);
const bcrypt = require('bcrypt');
const port = 3000;
const path = require('path');
const route = require(`./routes`);
const dbService = require(`./config/db/db`);

// const db = dbService.getDBServiceInstance();
//template engine
app.engine(`handlebars`, handlebars(
));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan(`combined`));
app.use(express.json());
app.set(`view engine`, `handlebars`);
app.set('views', path.join(__dirname, 'resources/views'));

//routing
route(app);


// app.get(`/tin-tuc`, (req, res) => {
//     return res.render(`news`);
// })


app.listen(port, () => console.log(`running at http://localhost:${port}`));