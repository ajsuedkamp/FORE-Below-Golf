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
        const queryText = `INSERT INTO "golf_history" ("golf_venue_id", "date", "note", "user_id")
                           VALUES($1, $2, $3, $4)`;
        pool.query(queryText, [req.body.venueId, req.body.date, req.body.note, req.user.id]).then(() => {
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
        let queryText = `SELECT "golf_history".*, "golf_venues"."venue_name", "golf_venues"."feature_1", "golf_venues"."feature_2", "golf_venues"."feature_3" FROM "golf_history"
                        JOIN "golf_venues" ON "golf_history"."golf_venue_id" = "golf_venues"."id"
                        WHERE "golf_history"."user_id" = $1;`;
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

router.get('/:id', (req, res) => {
    console.log('/golf_history GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "golf_history" WHERE "user_id" = $1 AND id=$2;`;
        pool.query(queryText, [req.user.id, req.params.id]).then((results) => {
            res.send(results.rows[0]);
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

router.put('/:id', (req, res) => {
    if (req.isAuthenticated()) {
    const queryText = `UPDATE "golf_history" SET "golf_venue_id" = $1, "date" = $2, "note" = $3
    WHERE "id" = $4 AND "user_id" = $5;`; // AND "user_id" = $5; // For solo projects
    pool.query(queryText, [req.body.venueId, req.body.date, req.body.note, req.params.id, req.user.id])
        .then(results => {
          res.sendStatus(200);
        }).catch(error => {
          console.log(error);
          res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
  });






module.exports = router;