const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `SELECT "document".*, "people".id, "people".firstname, "people".lastname, "people".birthdate, "people".sex, "people".residencecntry, "people".citizenshipcntry,  "address".* FROM "people"
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

router.post('/add', rejectUnauthenticated, async (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.body.crew:', req.body.crew);
    console.log('req.body.travelDocumentOne:', req.body.travelDocumentOne);
    console.log('is there a travel document two:', (req.body.travelDocumentTwo) ? true : false)

    const connection = await pool.connect();

    const crew = req.body.crew;
    console.log('req.body.crew', req.body.crew)
    const travelDocumentOne = req.body.travelDocumentOne;
    const travelDocumentTwo = req.body.travelDocumentTwo;

    let crew_address_id = 0;
    let crew_id = 0;
    
    const addressQuery = `
        INSERT INTO "address" (streetaddr, city, state, postalcode, countrycode)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING "id";
    `
    const crewQuery = `
        INSERT INTO "people" (lastname, firstname, middlename, birthdate, sex, residencecntry, citizenshipcntry, emailaddr, telephonenbr, peopletype, user_id, permanentaddress_id, addresswhileinus_id)
        SELECT $1, $2, $3, $4, $5, $6, $7, CAST($8 AS VARCHAR), $9, $10, $11, $12, $13
        WHERE NOT EXISTS(
            SELECT * FROM "people"
            WHERE(
                "emailaddr" = $8
                AND
                "peopletype" = $10
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
        let result = await connection.query(addressQuery, [crew.streetAddress, crew.city, crew.state, crew.postalCode, crew.residenceCountry])
        crew_address_id = result.rows[0].id;
        console.log('got all the way to address', result.rows[0].id);

        result = await connection.query(crewQuery, [crew.lastName, crew.firstName, crew.middleName, crew.birthDate, crew.sex, crew.residenceCountry, crew.residenceCountry, crew.email, crew.phoneNumber, 2, req.user.id, crew_address_id, crew_address_id])
        crew_id = result.rows[0].id;
        console.log('got all the way to crew', result.rows[0].id);

        await connection.query(documentQuery, [travelDocumentOne.documentType, travelDocumentOne.documentNumber, travelDocumentOne.expiryDate, travelDocumentOne.residenceCountry, crew_id])
        console.log('got all the way to doc 1');
        if(travelDocumentTwo){
            await connection.query(documentQuery, [travelDocumentTwo.documentType, travelDocumentTwo.documentNumber, travelDocumentTwo.expiryDate, travelDocumentTwo.residenceCountry, crew_id])
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
