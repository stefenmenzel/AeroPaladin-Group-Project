const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();


/**
 * POST apis route 
 */
router.post('/', (req, res) => {

});


module.exports = router;