const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `SELECT "document".*, "people".id, "people".firstname, "people".birthdate, "people".sex, "people".residencecntry, "people".citizenshipcntry,  "address".* FROM "people"
JOIN "address" ON "address".id = "people".addresswhileinus_id
JOIN "document" ON "document".people_id = "people".id
WHERE "people".peopletype = 2;`
    pool.query(sqlQuery).then(result => {
        console.log(' Crew Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Crew GET', err);
        res.SendStatus(500)
    })
});


module.exports = router;
