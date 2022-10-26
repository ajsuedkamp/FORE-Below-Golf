const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req, res) => {
    console.log('/golf_history POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
        //
        const queryText = `INSERT INTO "golf_history" ("venue_name", "date", "note", "user_id")
                           VALUES($1, $2, $3, $4)`;
        pool.query(queryText, [req.body.name, req.body.date, req.body.note, req.user.id]).then(() => {
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
        let queryText = `SELECT * FROM "golf_history" WHERE "user_id" = $1;`;
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

router.delete('/:id', (req, res) => {
    console.log('/golf_history DELETE route');
    if (req.isAuthenticated()) {
        let queryText = 'DELETE FROM "golf_history" WHERE "id" = $1 AND "user_id" = $2;';
        console.log(req.params.id, req.user.id);
        pool.query(queryText, [req.params.id, req.user.id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});





module.exports = router;