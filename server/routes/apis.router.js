const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const moment = require('moment');
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
                           VALUES ($1, $2, $3, $4)
                           RETURNING "itinerary".id;`
    ;
    
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
    console.log('in CONNECTION');
    
    try {
        await connection.query('BEGIN');
        
        let departure = flightSegmentOneData.departure;
        let arrival = flightSegmentOneData.arrival;
        console.log('arrival ONE', arrival);
        
        //AIRPORT POST
        result = await connection.query(airportPost, 
            [departure.airport, 
            departure.city, 
            departure.country, 
            departure.state,
            departure.description])
            airport_id_One = result.rows[0].id;
            console.log('IN AIRPORT ONE', airport_id_One);
            
        result = await connection.query(airportPost, 
            [
              arrival.airport,
              arrival.city,
              arrival.country,
              arrival.state,
              arrival.description
            ])
            airport_id_Two = result.rows[0].id;
            console.log('IN AIRPORT TWO');
        departure = flightSegmentTwoData.departure;
        arrival = flightSegmentTwoData.arrival;
        
        result = await connection.query(airportPost, 
            [departure.airport, 
            departure.city, 
            departure.country, 
            departure.state,
            departure.description])
            airport_id_Three = result.rows[0].id;
                console.log('IN AIRPORT THREE');
        result = await connection.query(airportPost, 
            [
              arrival.airport,
              arrival.city,
              arrival.country,
              arrival.state,
              arrival.description
            ])
            airport_id_Four = result.rows[0].id;
            console.log('IN AIRPORT FOUR');
    // ITINERARY POST
        let testTime = flightSegmentOneData.departure.date + 'T' + flightSegmentOneData.departure.time + ':00CST';
        console.log('TEST TIME HERE', testTime);
        
       //console.log('time statmp', moment(flightSegmentOne.departure.date + ' ' + flightSegmentOne.departure.time));
        
        result = await connection.query(itineraryPost, 
                [
                    airport_id_One, 
                    flightSegmentOneData.departure.date + 'T' + flightSegmentOneData.departure.time + ':00CST',
                    airport_id_Two,
                    flightSegmentOneData.arrival.date + 'T' + flightSegmentOneData.arrival.time + ':00CST'
                ])
                itinerary_id_One = result.rows[0].id;
                console.log('in Itinerary ONE', itinerary_id_One);
                
                
        result = await connection.query(itineraryPost, 
                [
                    airport_id_Three, 
                    departure.date + 'T' + departure.time + ':00CST',
                    airport_id_Four,
                    arrival.date + 'T' + arrival.time + ':00CST'
                ])
                itinerary_id_Two = result.rows[0].id;
                console.log('in Itinerary TWO', itinerary_id_Two);

        // FLIGHT POST
        result = await connection.query(flightPost,
            [
                itinerary_id_One,
                crew.emergency_id,
                aircraft.id,
                aircraft.operator_id,
                aircraft.owner_id,
                2
            ]) 
            flight_id_One = result.rows[0].id;
            console.log('in flight ONE', flight_id_One);
        //post second flight
        result = await connection.query(flightPost,
            [
                itinerary_id_Two,
                crew.emergency_id,
                aircraft.id,
                aircraft.operator_id,
                aircraft.owner_id,
                2
            ])
        flight_id_Two = result.rows[0].id;
        console.log('in flight TWO', flight_id_Two);
    
    // USER_ITINERARY POST
        await connection.query(userItineraryPost,
            [
                req.user.id,
                itinerary_id_One
            ])
            console.log('in user_itinerary ONE');
        //post second itinerary
        await connection.query(userItineraryPost,
            [
                req.user.id,
                itinerary_id_Two
            ])
            console.log('in user_itinerary TWO');
    //FLIGHT_PEOPLE POST
        //crew post
        await connection.query(flightPeoplePost,
            [
                crew.id,
                flight_id_One
            ])
            console.log('in flight_people ONE');
        await connection.query(flightPeoplePost,
            [
                crew.id,
                flight_id_Two
            ])
            console.log('in flight_people TWO');
        //passenger post
        for(let i=0; i < paxData.length; i++){
            await connection.query(flightPeoplePost,
                [
                    paxData[i].id,
                    flight_id_One
                ])
            console.log(`in passenger ${i+1}`);
            await connection.query(flightPeoplePost,
                [
                    paxData[i].id,
                    flight_id_Two
                ])
            console.log(`in passenger2 ${i+1}`);
        } 
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
});

module.exports = router;