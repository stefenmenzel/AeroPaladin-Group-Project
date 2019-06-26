const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

//we'll need to send this as a transaction...those look better as an async await
//thus we declare our callback function async
router.post('/add', rejectUnauthenticated, async (req, res) => {    
    //a transaction has to be sent via a single consistent connection
    //so we establish a solid connection.
    const connection = await pool.connect();

    //separate our variables out of our request.
    const aircraft = req.body.aircraft;
    const operator = req.body.operator;
    const owner = req.body.owner;

    //lets also store some variables to reference the 
    //new sql table id's we'll be creating
    let owner_id = 0;
    let owner_address_id = 0;
    let operator_id = 0;
    let operator_address_id = 0;
    
    //Query to stash address for both owner and operator
    const addressQuery = `
        INSERT INTO "address" (streetaddr, city, state, postalcode)
        VALUES ($1, $2, $3, $4)
        RETURNING "id";
    `
    //query to stash owner info
    const ownerQuery = `
        INSERT INTO "people" (lastname, firstname, middlename, emailaddr, telephonenbr, peopletype, user_id, permanentaddress_id)
        SELECT $1, $2, $3, CAST($4 AS VARCHAR), $5, $6, %7, $8
        WHERE NOT EXISTS(
            SELECT * FROM "people"
            WHERE(
                "emailaddr" = $4
                AND
                "peopletype" = %6
            )
        )
        RETURNING "id";
    `
    //query to stash operator info
    const operatorQuery = `
        INSERT INTO "people" (lastname, firstname, middlename, emailaddr, telephonenbr, peopletype, user_id, permanentaddress_id)
        SELECT $1, $2, $3, CAST($4 AS VARCHAR), $5, %6, %7, $8
        WHERE NOT EXISTS(
            SELECT * FROM "people"
            WHERE(
                "emailaddr" = $4
                AND
                "peopletype" = $6
            )
        )
        RETURNING "id";                
    `
    //query to stash aircraft info
    const aircraftQuery = `
        INSERT INTO "aircraft" (tailnumber, typeaircraft, color, callsign, cbpdecalnbr, owner_id, operator_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `

    /*
    here's the business...we're going to send this as a SQL transaction
    we'll be sending ALL the data or NONE of the data. After the transaction
    is either successful or a failure...we must release our connection to the database.
    */
    try{
        /**********
        all transactions begin with a "BEGIN" and end with a "COMMIT"
        declaring these queries as an "await" will allow us to wait for 
        responses from the database before we start the next query.
        all of these queries requre that we have an id from the last query.
        **********/

        await connection.query('BEGIN');
        await connection.query(addressQuery, [owner.streetAddress, owner.city, owner.state, owner.postalCode])
            .then((result) => {owner_address_id = result.rows[0].id});

        await connection.query(ownerQuery, [owner.lastName, owner.firstName, owner.middleName, owner.email, owner.phoneNumber, 4, req.user.id, owner_address_id])
            .then((result) => {owner_id = result.rows[0].id});

        await connection.query(addressQuery, [operator.streetAddress, operator.city, operator.state, operator.postalCode])
            .then((result) => {operator_address_id = result.rows[0].id});

        await connection.query(operatorQuery, [operator.lastName, operator.firstName, operator.middleName, operator.email, operator.phoneNumber,3, req.user.id, operator_address_id])
            .then((result) => {operator_id = result.rows[0].id})

        await connection.query(aircraftQuery, [aircraft.tailNumber, aircraft.type, aircraft.color, aircraft.callSign, aircraft.CBP, owner_id, operator_id])

        await connection.query('COMMIT');
        res.sendStatus(201);
    }catch(error){
        /**
         * If the transaction fails at any point in the process
         * we'll "ROLLBACK" the transaction...all the data is released.
         * no changes are made
         */

        await connection.query('ROLLBACK');
        console.log('Transaction Error with post aircraft', error);
        res.sendStatus(500);
    }finally{
        //whatever the case we release the connection
        connection.release();
    } 
});

module.exports = router;