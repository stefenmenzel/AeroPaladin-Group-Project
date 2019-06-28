const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
<<<<<<< HEAD
    const sqlQuery = `SELECT "document".*, "people".id, "people".firstname, "people".lastname, "people".birthdate, "people".sex, "people".residencecntry, "people".citizenshipcntry,  "address".* FROM "people"
=======
    const sqlQuery = `SELECT "document".*, "people".active, "people".id as people_id, "people".firstname, "people".birthdate, "people".sex, "people".residencecntry, "people".citizenshipcntry,  "address".* FROM "people"
>>>>>>> c6bf7d9079b2f042321e3a9f20b40f5ba9b3faa5
JOIN "address" ON "address".id = "people".addresswhileinus_id
JOIN "document" ON "document".people_id = "people".id
WHERE "people".peopletype = 1
AND "people".active = TRUE
;`
    pool.query(sqlQuery).then(result => {
        console.log(' Passenger Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Passenger GET', err);
        res.SendStatus(500)
    })
});  

router.put('/delete/:id', rejectUnauthenticated, (req, res) => {
    let deleteID = req.params.id
    console.log('DELETE', deleteID);
    
    const sqlQuery = `UPDATE "people"
SET "active" = false
WHERE "id" = $1;`
    pool.query(sqlQuery, [deleteID]).then(result => {
        console.log('DELETEEEEEE', result);
        res.sendStatus(200)
    }).catch(err => {
        console.log('Error in DELETE', err);
        res.SendStatus(500)
    })
});



router.post('/add', rejectUnauthenticated, async (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.body.passenger:', req.body.passenger);
    console.log('req.body.travelDocumentOne:', req.body.travelDocumentOne);
    console.log('is there a travel document two:', (req.body.travelDocumentTwo) ? true : false)

    const connection = await pool.connect();

    const passenger = req.body.passenger;
    const travelDocumentOne = req.body.travelDocumentOne;
    const travelDocumentTwo = req.body.travelDocumentTwo;

    let passenger_address_id = 0;
    let passenger_id = 0;
    
    const addressQuery = `
        INSERT INTO "address" (streetaddr, city, state, postalcode, countrycode)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING "id";
    `
    const passengerQuery = `
        INSERT INTO "people" (lastname, firstname, middlename, birthdate, sex, residencecntry, emailaddr, telephonenbr, peopletype, user_id, permanentaddress_id)
        SELECT $1, $2, $3, $4, $5, $6, CAST($7 AS VARCHAR), $8, $9, $10, $11
        WHERE NOT EXISTS(
            SELECT * FROM "people"
            WHERE(
                "emailaddr" = $7
                AND
                "peopletype" = $9
            )
        )
        RETURNING "id";
    `

    const documentQuery = `
        INSERT INTO "document" (doccode, documentnbr, expirydate, cntrycode, people_id)
        SELECT CAST($1 AS VARCHAR), CAST($2 AS VARCHAR), $3, $4, $5
        WHERE NOT EXISTS(
            SELECT * FROM "document"
            WHERE(
                "doccode" = $1
                AND
                "documentnbr" = $2
            )
        );
    `

    try{
        await connection.query('BEGIN');
        let result = await connection.query(addressQuery, [passenger.streetAddress, passenger.city, passenger.state, passenger.postalCode, passenger.residenceCountry])
        passenger_address_id = result.rows[0].id;
        console.log('got all the way to address', result.rows[0].id);

        result = await connection.query(passengerQuery, [passenger.lastName, passenger.firstName, passenger.middleName, passenger.birthDate, passenger.sex, passenger.residenceCountry, passenger.email, passenger.phoneNumber, 1, req.user.id, passenger_address_id])
        passenger_id = result.rows[0].id;
        console.log('got all the way to passenger', result.rows[0].id);

        await connection.query(documentQuery, [travelDocumentOne.documentType, travelDocumentOne.documentNumber, travelDocumentOne.expiryDate, travelDocumentOne.residenceCountry, passenger_id])
        console.log('got all the way to doc 1');
        if(travelDocumentTwo){
            await connection.query(documentQuery, [travelDocumentTwo.documentType, travelDocumentTwo.documentNumber, travelDocumentTwo.expiryDate, travelDocumentTwo.residenceCountry, passenger_id])
            console.log('got all the way to doc 2');
        }
        await connection.query('COMMIT');
        console.log('made it through');
        res.sendStatus(201);
    }catch(error){
        await connection.query('ROLLBACK');
        res.sendStatus(500);
    }finally{
        connection.release();
    }
})


module.exports = router;
