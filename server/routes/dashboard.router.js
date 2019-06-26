const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//get all the  APIS Trips 
router.get('/apis', rejectUnauthenticated, (req, res) => {
    console.log('GET Route');
    let queryText = `SELECT "itinerary".id, "airport".state as departure_state, "itinerary".localarrivaltimestamp, "itinerary"."localdeparturetimeStamp" ,"b".state as arrival_state FROM 
    "itinerary"
    JOIN "airport" ON "itinerary"."departure_airport_id"  = "airport".id
    JOIN "airport" as b on  "itinerary"."inboundarrivalLocation_airport_id"  = "b".id
    JOIN "flight" ON "itinerary".id = "itinerary".id
    WHERE "flight".flight_status = 2
    ORDER BY "localarrivaltimestamp";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500)
    })
})

// //delete the APIS Trip from the database
// router.delete('/delete/:id', (req,res) => {
//     console.log('req.params.id: ' + req.params.id + ' req.user.id: ' + req.user.id);
//     let queryText = ``
//   pool.query(queryText, [req.params.id, req.user.id]).then((result) => {
//       res.sendStatus(200);
//   }).catch((error) => {
//       console.log(error);
//       res.sendStatus(500);
//   });;

// });

module.exports = router;