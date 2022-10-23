const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req, res) => {
    console.log('/golf_venues POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()) {
        const queryText = `INSERT INTO "golf_venues" ("venue_name", "type", "yardage", "user_id")
                           VALUES($1, $2, $3, $4)`;
        pool.query(queryText, [req.body.name, req.body.type, req.body.yardage, req.user.id]).then(() =>{
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