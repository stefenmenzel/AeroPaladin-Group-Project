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
WHERE "people".peopletype = 2
AND "active" = TRUE
AND "people".user_id = $1;`
    pool.query(sqlQuery, [req.user.id]).then(result => {
        console.log(' Crew Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Crew GET', err);
        res.SendStatus(500)
    })
});

router.put('/delete/:id', rejectUnauthenticated, (req, res) => {
    let deleteID = req.params.id
    console.log('DELETE CREW', deleteID);

    const sqlQuery = `UPDATE "people"
SET "active" = false
WHERE "id" = $1;`

    pool.query(sqlQuery, [deleteID]).then(result => {
        console.log('DELETE', result);
        res.sendStatus(200)
    }).catch(err => {
        console.log('Error in DELETE', err);
        res.SendStatus(500)
    })
});

// Send PASSENGER information to Reducer to update on form
router.get('/updatecrew/:id', rejectUnauthenticated, (req, res) => {
    let updateCrewId = req.params.id

    const sqlQuery = `SELECT "people".id, "people".firstname AS "firstName",
    "people".lastname AS "lastName", "people".middlename AS "middleName", "people".telephonenbr AS "phoneNumber",
    "people".birthdate AS "birthDate", "people".sex, "people".residencecntry AS "residenceCountry",
    "people".citizenshipcntry AS "citizenShipCountry","people".emailaddr AS "email", "address".postalcode AS "postalCode",
    "address".state,"address".city, "address".streetaddr AS "streetAddress" FROM "people"
JOIN "address" ON "address".id = "people".addresswhileinus_id
WHERE "people".peopletype = 2
AND "people".id = $1
AND "people".user_id = $2
;
`
    pool.query(sqlQuery, [updateCrewId, req.user.id]).then(result => {
        console.log(' Passenger Update Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Crew Update GET', err);
        res.SendStatus(500)
    })
});

router.get('/updatedocument1/:id', rejectUnauthenticated, (req, res) => {
    let updateDocumentId = req.params.id
    const sqlQuery = `SELECT "document".id, "document".documentnbr AS "documentNumber","document".doccode AS "documentType","document".expirydate AS "expiryDate", "document".cntrycode AS "residenceCountry"  FROM "people" as people_table
JOIN "document" ON "document".people_id = "people_table".id
WHERE people_table.peopletype = 2
AND people_table.id = $1
AND people_table.user_id = $2
ORDER BY "document".id DESC
LIMIT 1
OFFSET 1`
    pool.query(sqlQuery, [updateDocumentId, req.user.id]).then(result => {
        console.log(' Crew Document One Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Crew Document One GET', err);
        res.SendStatus(500)
    })
});

router.get('/updatedocument2/:id', rejectUnauthenticated, (req, res) => {
    let updateDocumentId = req.params.id
    const sqlQuery = `SELECT "document".id, "document".documentnbr AS "documentNumber","document".doccode AS "documentType","document".expirydate AS "expiryDate", "document".cntrycode AS "residenceCountry"  FROM "people" as people_table
JOIN "document" ON "document".people_id = "people_table".id
WHERE people_table.peopletype = 2
AND people_table.id = $1
AND people_table.user_id = $2
ORDER BY "document".id DESC
LIMIT 1
;`
    pool.query(sqlQuery, [updateDocumentId, req.user.id]).then(result => {
        console.log(' Crew Document Two Result', result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error in Crew Document Two GET', err);
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

router.put('/update', rejectUnauthenticated, async (req, res) => {
    console.log('req.body for update crew:', req.body);
    res.sendStatus(201);
})



module.exports = router;
