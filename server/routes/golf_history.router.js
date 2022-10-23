const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req,res) => {
    console.log('/golf_history GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "golf_venues" 
                         JOIN "golf_history" ON "golf_venues"."id" = "golf_history"."golf_venue_id"
                         WHERE "golf_history"."user_id"= $1;`;
        pool.query(queryText, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        }); 
    } else {
        res.sendStatus(403);
    }
});

router.post('/', (req, res) => {
    console.log('/golf_history POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()) {
        const queryText = ``
    }
    res.sendStatus(200);
});

module.exports = router;