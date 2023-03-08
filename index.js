const express = require('express');
const path = require('path')
const children = require('./Children');
const logger = require('./middleware/logger');

const app = express();

//init middleware
//app.use(logger);

//gets all children
app.get('/api/children', (req, res) => res.json(children));

//get single child
app.get('/app/children/:id', (req, res) => {
    const found = children.some(child => child.id === parseInt(req.params.id));
    if(found) {
        res.json(children.filter(child => child.id === parseInt(req.params.id )));
    } else {
        res.status(400).json({ msg: `No child with id of ${req.params.id}` });
    }
});

//set static folder
app.use(express.static(path.join(__dirname, 'files')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server at: ${PORT}`));