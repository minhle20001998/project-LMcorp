const express = require('express');
const morgan = require(`morgan`);
const handlebars = require(`express-handlebars`);
const app = express();
const port = 3000;
const path = require('path');

let count = 0;
//template engine
app.engine(`handlebars`, handlebars(
));
app.use(express.static(path.join(__dirname, 'public')));
app.set(`view engine`, `handlebars`);
app.set('views', path.join(__dirname, 'resources/views'));

app.use(morgan(`combined`));
app.get(`/`, (req, res) => {
    return res.render(`home`);
})

app.get(`/tin-tuc`, (req, res) => {
    return res.render(`news`);
})


app.listen(port, () => console.log(`running at http://localhost:${port}`));