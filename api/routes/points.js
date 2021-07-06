const express = require('express');
const cors = require('cors');
const db = require('../config/db')

const router = express.Router();

const corsOptions = {
    methods: ['GET', 'PATCH', 'POST']
}

router.get('/:id', async (req, res, next) => {
    try {
        let results = await db.points(req.params.id);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/:id', async (req, res, next) => {
    const errors = []
    if (!req.body.amount){
        errors.push("No Amount");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    try {
        let results = await db.pointscheck(req.params.id, req.body.amount);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res, next) => {
    const errors = []
    if (!req.body.amount){
        errors.push("No Amount");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    try {
        let results = await db.pointsupdate(req.params.id, req.body.amount);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;