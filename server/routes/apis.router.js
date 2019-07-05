const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();


/*** POST apis route ***/
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('req.body here: ', req.body);
    
    const connection = await pool.connect();

    //returning data from DB queriess
    let airport_id_One = 0;
    let itinerary_id_One = 0;
    let flight_id_One = 0;
    let emergency_Contact_id = 0;
    //
    let crewID = 0;
    
    //objects
    let crewData = req.body.crew;
    let aircraftData = req.body.aircraft;
    let flightSegmentOneData = req.body.flightSegmentOne;
    let flightSegmentTwoData = req.body.flightSegmentTwo;

    //array of objects
    let paxData = req.body.passenger;


    const airportPost = `INSERT INTO "airport" ("airportcode", 
                         "city", 
                         "cntrycode", 
                         "state", 
                         "description") 
                         SELECT $1, $2, $3, $4, $5 
                         RETURNING "airport".id ;`

    const itineraryPost = `INSERT INTO "itinerary" ("departure_airport_id", 
                            "localdeparturetimeStamp", 
                            "inboundarrivalLocation_airport_id", 
                            "localarrivaltimestamp")
                           VALUES ($1), $2, $3, $4)
                           RETURNING "itinerary".id;`
    });
    
    const flightPost = `INSERT INTO "flight" ("itinerary_id", 
                        "emergencycontact_id",
                        "aircraft_id", 
                        "operator_id", 
                        "owner_id", 
                        "flight_status")
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING "flight".id;`
    
    const userItineraryPost = `INSERT INTO "user_itinerary" ("user_id", 
                              "itinerary_id")
                               VALUES ($1, $2);`

    const flightPeoplePost = `INSERT INTO "flight_people" ("people_id", 
                              "flight_id")
                              VALUES ($1, $2); `

    // try {
    //     await connection.query('BEGIN');
        
        
    //     //passenger post loop
    //     for (let i=0; i <= paxData.length; i++){

    //     }



    //     //committing all posts
    //     await connection.query('COMMIT');
    //     console.log('made it through');
    //     res.sendStatus(201);
    // }
    // catch(error){
    //     await connection.query('ROLLBACK');
    //     res.sendStatus(500);
    // }
    // finally{
    //     connection.release();
    // }

module.exports = router;