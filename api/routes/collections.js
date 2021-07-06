const express = require('express');
const db = require('../config/db')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let results = await db.collections();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let results = await db.onecollection(req.params.id);
        res.json(results[0]);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;