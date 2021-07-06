const express = require('express');
const db = require('../config/db')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let results = await db.badges();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let results = await db.onebadge(req.params.id);
        res.json(results[0]);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post("/add/:id", async (req, res, next) => {
    const errors = []
    if (!req.body.badgeid){
        errors.push("No Badge ID");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    try {
        let results = await db.addbadge(req.params.id, req.body.badgeid);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;