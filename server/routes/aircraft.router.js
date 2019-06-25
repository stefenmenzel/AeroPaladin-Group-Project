const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

router.post('/add', rejectUnauthenticated, (req, res) => {
    console.log('we here in the aircraft router with req.body:', req.body);
    console.log('we here with req.body.aircraft:', req.body.aircraft);
    console.log('we here with req.body.operator:', req.body.operator);
    console.log('we here with req.body.owner:', req.body.owner);
});

module.exports = router;