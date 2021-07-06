const express = require('express');
const db = require('../config/db')

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    try {
        let results = await db.member(req.params.id);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;