const express = require('express');
const router = express.Router();

// DB CONNECTION
const pool = require('../pool');

// get last 10 operations stored in database
router.get('/', ( req, res ) => {
    pool.query( `SELECT * FROM "calculations" ORDER BY "id" DESC LIMIT 10;` )
    .then( result => {
        res.send( result.rows );
    }).catch( error => {
        console.log( `error getting the latest calculations from the database`, error );
        res.sendStatus( 500 );
    })
});

// post new equation and result to database
router.post('/', ( req, res ) => {
    let equation = req.body.calculation;
    let solution = req.body.result;
    let sqlText = `INSERT INTO "calculations" ("equation", "solution")
                   VALUES ($1, $2);`;
    pool.query( sqlText, [equation, solution])
    .then( response => {
        res.sendStatus( 201 );
    }).catch( error => {
        console.log( `error adding your new calculation to the database`, error );
        res.sendStatus( 500 );
    })
});


module.exports = router;