const express = require('express');
const path = require('path')
const children = require('./Children');
const moment = require('moment');

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

//init middleware
app.use(logger);

//gets all children
app.get('/api/children', (req, res) => res.json(children));

//set static folder
app.use(express.static(path.join(__dirname, 'files')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server at: ${PORT}`));