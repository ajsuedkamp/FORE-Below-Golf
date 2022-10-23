const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req, res) => {
    console.log('/golf_venues POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
        const queryText = `INSERT INTO "golf_venues" ("venue_name", "type", "yardage", "user_id")
                           VALUES($1, $2, $3, $4)`;
        pool.query(queryText, [req.body.name, req.body.type, req.body.yardage, req.user.id]).then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log(error);
            alert("something went wrong in venues POST");
            res.sendStatus(500);
        })

    } else {
        res.sendStatus(403); //Forbidden
    }
});

router.get('/', (req, res) => {
    console.log('/golf_history GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "golf_history" 
                         JOIN "golf_venues" ON "golf_history"."id" = "golf_history"."golf_venue_id"
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



module.exports = router;