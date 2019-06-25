const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//get all the  APIS Trips 
router.get('/apis', rejectUnauthenticated, (req, res) => {
    console.log('GET Route');
    let queryText = `SELECT "airport".state as departure_state, "itinerary".localarrivaltimestamp, "itinerary"."localdeparturetimeStamp" ,"b".state as arrival_state FROM 
    "itinerary"
    JOIN "airport" ON "itinerary"."departure_airport_id"  = "airport".id
    JOIN "airport" as b on  "itinerary"."inboundarrivalLocation_airport_id"  = "b".id
    ORDER BY "localarrivaltimestamp";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500)
    })
})


module.exports = router;