const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `SELECT "people".id, "people".firstname, "people".birthdate, "people".sex, "people".residencecntry, "people".citizenshipcntry, "address".streetaddr, "address".city, "address".state, "address".postalcode, "address".countrycode  FROM "people"
JOIN "address" on "address".id = "people".addresswhileinus_id
WHERE "people".peopletype = 1;`
    pool.query(sqlQuery).then(result => {
        console.log(' Passenger Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Passenger GET', err);
        res.SendStatus(500)
    })
});  


module.exports = router;
