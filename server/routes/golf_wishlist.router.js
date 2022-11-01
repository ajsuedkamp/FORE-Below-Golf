const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    console.log('/golf_wishlist POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
        //
        const queryText = `INSERT INTO "golf_wishlist" ("venue_name", "feature_1", "feature_2", "feature_3", "user_id")
                           VALUES($1, $2, $3, $4, $5);`;
        console.log(req.body);
        pool.query(queryText, [req.body.name, req.body.feature_1, req.body.feature_2, req.body.feature_3, req.body.id]).then(() => {
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


module.exports = router;