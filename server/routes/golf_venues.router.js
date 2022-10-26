const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log('/golf_venues GET route');
    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "golf_venues"`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});


module.exports = router;