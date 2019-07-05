const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();


/*** POST apis route ***/
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('req.body here: ', req.body);

    //returning data from DB queriess
    let airport_id_One = 0;
    let airport_id_Two = 0;
    let airport_id_Three = 0;
    let airport_id_Four = 0;
    let itinerary_id_One = 0;
    let itinerary_id_Two = 0;
    let flight_id_One = 0;
    let flight_id_Two = 0;

    //
    let crewID = 0;
    let result;

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

    const connection = await pool.connect();
    
    try {
        await connection.query('BEGIN');
        
        let departure = flightSegmentOneData.departure;
        let arrival = flightSegmentOneData.arrival;

        //AIRPORT POST
        result = await connection.query(airportPost, 
            [departure.airport, 
            departure.city, 
            departure.country, 
            departure.state,
            departure.description])
            airport_id_One = result.rows[0].id;

        result = await connection.query(airportPost, 
            [
              arrival.airport,
              arrival.city,
              arrival.country,
              arrival.state,
              arrival.description
            ])
            airport_id_Two = result.rows[0].id;

        departure = flightSegmentTwoData.departure;
        arrival = flightSegmentTwoData.arrival;
        
        result = await connection.query(airportPost, 
            [departure.airport, 
            departure.city, 
            departure.country, 
            departure.state,
            departure.description])
            airport_id_Three = result.rows[0].id;

        result = await connection.query(airportPost, 
            [
              arrival.airport,
              arrival.city,
              arrival.country,
              arrival.state,
              arrival.description
            ])
            airport_id_Four = result.rows[0].id;

    // ITINERARY POST
        result = await connection.query(itineraryPost, 
                [
                    airport_id_One, 
                    flightSegmentOne.departure.date + flightSegmentOne.departure.time,
                    airport_id_Two,
                    flightSegmentOne.arrival.date + flightSegmentOne.arrival.time
                ])
                itinerary_id_One = result.rows[0].id;
                
        result = await connection.query(itineraryPost, 
                [
                    airport_id_Three, 
                    departure.date + departure.time,
                    airport_id_Four,
                    arrival.date + arrival.time
                ])
                itinerary_id_Two = result.rows[0].id;

        // FLIGHT POST
        result = await connection.query(flightPost,
            [
                itinerary_id_One,
                crew
            ])

        //committing all posts
        await connection.query('COMMIT');
        console.log('made it through');
        res.sendStatus(201);
    }
    catch(error){
        await connection.query('ROLLBACK');
        res.sendStatus(500);
    }
    finally{
        connection.release();
    }

module.exports = router;