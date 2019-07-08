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

    //setting results 
    
    let result;

    //objects
    let crewData = req.body.crew;
    let aircraftData = req.body.aircraft;
    let flightSegmentOneData = req.body.flightSegmentOne;
    let flightSegmentTwoData = req.body.flightSegmentTwo; 

    //array of objects
    let paxData = req.body.passenger;
    let flightStatusNum = 2;

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
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING "flight".id;`
    
    const userItineraryPost = `INSERT INTO "user_itinerary" ("user_id", 
                              "itinerary_id")
                               VALUES ($1, $2);`

    const flightPeoplePost = `INSERT INTO "flight_people" ("people_id", 
                              "flight_id")
                              VALUES ($1, $2); `

    const xmlGetNoAddr = `SELECT 
		--airport data
		flightBuilding1.airportcode AS inboundAirportCode,
		flightBuilding1.city AS inboundAirportCity,
		flightBuilding1.description AS inboundAiportDesc,
		flightBuilding1.cntrycode AS inboundCountryCode,
		flightBuilding2.city AS departureAirportCity,
		flightBuilding2.cntrycode AS departureCountryCode,
		flightBuilding2.airportcode AS departureAirportCode,
		flightBuilding2.description AS departureAirportDesc,
		it."localdeparturetimeStamp" AS departureTimeStamp, 
		it.localarrivaltimestamp AS arrivalTimeStamp,
 	    flightBuilding2.airportcode AS departureAirportcode,
 	    
 	    --aircraft info
 	    "aircraft".tailnumber,
 	    "aircraft".typeaircraft,
 	    "aircraft".color,
 	    "aircraft".callsign,
	    "aircraft".cbpdecalnbr,
	    
	    -- owner info
	    "p1".firstname AS ownerfirstname,
	    "p1".middlename AS ownermiddlename, 
	    "p1".lastname AS ownerlastname,
	    "p1".birthdate AS ownerbirthdate,
	    "p1".sex AS ownersex,
	    "p1".residencecntry AS ownerresidencecountry,
	    "p1".citizenshipcntry AS ownercitizenshipcountry,
	    "p1".emailaddr AS owneremail,
	    "p1".telephonenbr AS ownertelephonenbr,
	    p1.permanentaddress_id AS owneraddressid,
	    
	    
	    -- operator info
	    "p2".firstname AS operatorfirstname,
	    "p2".middlename AS operatormiddlename,
	    "p2".lastname AS operatorlastname,
	    "p2".birthdate AS operatorbirthdate,
	    "p2".sex AS operatorsex,
	    "p2".residencecntry AS operatorresidencecountry,
	    "p2".citizenshipcntry AS operatorcitizenshipcountry,
	    "p2".emailaddr AS operatoremail,
	    "p2".telephonenbr AS operatortelephonenbr,
	    p2.permanentaddress_id AS operatoraddressid,
	    
	    --crew data
	    json_agg(json_build_object(
					'crewInfoFirstName', p3.firstname,
					'crewInfoMiddleName', p3.middlename,
					'crewInfoLastName', p3.lastname,
					'crewInfobirthdate',p3.birthdate,
					'crewInfoSex', p3.sex,
					'crewInfoResidenceCountry', p3.residencecntry,
					'crewInfoCitizenshipCountry', p3.citizenshipcntry,
					'crewInfoEmail', p3.emailaddr,
					'crewInfoPhoneNbr', p3.telephonenbr,
					'crewInfoPeopleType', p3.peopletype,
					'crewInfoPermAddrID', p3.permanentaddress_id,
					'crewInfoAddrInUSID', p3.addresswhileinus_id
					)) AS crewInfo,
		
		--CREW DOCS DATA
		"d1".doccode AS crewdoccode,
		"d1".documentnbr AS crewdocnbr,
		"d1".cntrycode AS crewdoccountrycode,
		"d1".expirydate AS crewdocexpirationdate,
		
		-- CREW EMERGENCY CONTACT INFO
		"emergencycontacts".firstname AS emergencycontactfirstname,
		"emergencycontacts".middlename AS emergencycontactmiddlename,
		"emergencycontacts".lastname AS emergencycontactlastname,
		"emergencycontacts".telephonenbr AS emergencycontactphonenbr,
		"emergencycontacts".emailaddr AS emergencycontactemail,
	    
	--passenger data
	       json_agg(json_build_object(
					'paxDataFirstName', p4.firstname,
					'paxDataMiddleName', p4.middlename,
					'paxDataLastName', p4.lastname,
					'paxDatabirthdate', p4.birthdate,
					'paxDataSex', p4.sex,
					'paxDataResidenceCountry', p4.residencecntry,
					'paxDataCitizenshipCountry', p4.citizenshipcntry,
					'paxDataEmail', p4.emailaddr,
					'paxDataPhoneNbr', p4.telephonenbr,
					'paxDataPeopleType', p4.peopletype,
					'paxDataPermAdressID', p4.permanentaddress_id,
					'paxDataAddrInUSID', p4.addresswhileinus_id
					)) AS paxData,

		-- PAX DOCS DATA
		"d2".doccode AS paxdoccode,
		"d2".documentnbr AS paxdocnbr,
		"d2".cntrycode AS paxdoccntrycode,
		"d2".expirydate AS paxdocexpirationdate
		

from "itinerary" AS it
inner join "airport" as flightbuilding1 on it.departure_airport_id = flightbuilding1.id
inner join "airport" as flightbuilding2 on it."inboundarrivalLocation_airport_id" = flightbuilding2.id
LEFT JOIN "user_itinerary" ON it.id = "user_itinerary".itinerary_id
LEFT JOIN "flight" AS f1 ON it.id = "f1".itinerary_id
JOIN "aircraft" ON f1.aircraft_id = "aircraft".id
JOIN "people" AS p1 ON f1.owner_id = p1.id
JOIN "people" AS p2 ON f1.operator_id = p2.id
LEFT JOIN "address" AS adr1 ON "aircraft".owner_id = adr1.id
LEFT JOIN "address" AS adr2 ON "aircraft".operator_id = adr2.id
JOIN "flight_people" ON f1.id = "flight_people".flight_id
JOIN "people" AS p3 ON "flight_people".people_id = p3.id
JOIN "people" AS p4 ON "flight_people".people_id = p4.id
JOIN "people_document" AS peepdoc1 ON p3.id = peepdoc1.people_id
JOIN "people_document" AS peepdoc2 ON p4.id = peepdoc2.people_id
JOIN "document" AS d1 ON peepdoc1.people_id = d1.people_id
JOIN "document" AS d2 ON peepdoc2.people_id = d2.people_id
JOIN "people_emergencycontacts" ON p3.id = "people_emergencycontacts".people_id
JOIN "emergencycontacts" ON "people_emergencycontacts".emergencycontact_id = "emergencycontacts".id

WHERE f1.id = $1

GROUP BY inboundAirportCode, inboundAirportCity, inboundAiportDesc, 
         inboundCountryCode, departureAirportCity, departureCountryCode, 
         departureAirportCode, departureAirportDesc, departureTimeStamp, 
         arrivalTimeStamp, "aircraft".tailnumber, "aircraft".typeaircraft, 
         "aircraft".color, "aircraft".callsign, "aircraft".cbpdecalnbr, 
         ownerfirstname, ownermiddlename, ownerlastname, ownerbirthdate, 
         ownersex, ownerresidencecountry, ownercitizenshipcountry, owneremail, 
         ownertelephonenbr, operatorfirstname, operatormiddlename, operatorlastname, 
         operatorbirthdate, operatorsex, operatorresidencecountry, 
         operatorcitizenshipcountry, operatoremail, operatortelephonenbr, 
         owneraddressid, operatoraddressid, crewdoccode, crewdocnbr, 
         crewdoccountrycode, crewdocexpirationdate, paxdoccode, 
         paxdocnbr, paxdoccntrycode, paxdocexpirationdate, 
         emergencycontactfirstname, emergencycontactmiddlename, emergencycontactlastname, 
         emergencycontactphonenbr, emergencycontactemail;`

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
        console.log('right before FLIGHT with itinerary stuff: ', itinerary_id_One);
        //console.log('itinerary ID 2 data here: ', itinerary_id_Two);
        console.log('owner info :', aircraftData.owner_id);
        console.log('operator info: ', aircraftData.operator_id);
        console.log('aircraft info: ', aircraftData.id);
        console.log('emergency id stuff: ', crewData.emergency_id);
        console.log('flight status: ', flightStatusNum);
    
        result = await connection.query(flightPost,
            [
                itinerary_id_One,
                crewData.emergency_id,
                aircraftData.id,
                aircraftData.operator_id,
                aircraftData.owner_id,
                flightStatusNum
            ]) 
            flight_id_One = result.rows[0].id;
            console.log('in flight ONE', flight_id_One);
        //post second flight
        result = await connection.query(flightPost,
            [
                itinerary_id_Two,
                crewData.emergency_id,
                aircraftData.id,
                aircraftData.operator_id,
                aircraftData.owner_id,
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
        console.log('crew INFO HERE1', crewData);
        
        await connection.query(flightPeoplePost,
            [
                crewData.id,
                flight_id_One
            ])
            console.log('in flight_people ONE');
        await connection.query(flightPeoplePost,
            [
                crewData.id,
                flight_id_Two
            ])
            console.log('in flight_people TWO');
        //passenger post
        console.log('paxData:', paxData);
        for(let i=0; i < paxData.length; i++){
            console.log(`paxperson: ${i}, ${paxData[i]}`)
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
        await connection.query(xmlGetNoAddr, [flight_id_One])
        console.log('made it through');
        res.sendStatus(201);
    }
    catch(error){
        console.log('error in post apis:', error);
        await connection.query('ROLLBACK');
        res.sendStatus(500);
    }
    finally{
        connection.release();
    }
});

module.exports = router;