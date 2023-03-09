const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const children = require('../../Children');

//gets all children
router.get('/', (req, res) => res.json(children));

//get single child
router.get('/:id', (req, res) => {
    const found = children.some(child => child.id === parseInt(req.params.id));
    if(found) {
        res.json(children.filter(child => child.id === parseInt(req.params.id )));
    } else {
        res.status(400).json({ msg: `No child with id of ${req.params.id}` });
    }
});

//Create Child
router.post('/', (req, res) => {
    const newChild = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age,
        height: req.body.height,
        status: 'active'
    }

    if(!newChild.name || !newChild.age) {
        return res.status(400).json({ msg: 'Please include name and age' })
    }

    children.push(newChild);
    res.json(children);
});

module.exports = router;