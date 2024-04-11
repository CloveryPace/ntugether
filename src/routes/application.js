const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());

// Create a connection pool to the MySQL server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secure1234',
    database: 'ntugetherdb'
});

// connect to database server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server: ' + err.stack);
        return;
    }

    console.log('Connected to MySQL server');
});



/**
 * ROUTES: /application/apply
 * FUNCTION: apply for an activity
 */
router.post("/apply", function (req, res) {

    var activity_id = req.body.activity_id; // Assuming activity_id and value are sent in the POST body
    var application_response = req.body.application_response;

    // NOTE: the applicant_id is set as 1 tempororily
    connection.query('INSERT INTO Applications(applicant_id, activity_id, application_response, is_approved) VALUES (1, ?, ?, FALSE)', [activity_id, application_response], (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query: ' + error.stack);
            return res.status(500).send('Error executing MySQL query');
        }

        // Check if any rows were affected by the update
        if (results.affectedRows === 0) {
            return res.status(404).send('activity does not exist');
        }

        // Send success response
        res.send('application added');
    });


    // TODO: push notification;
});

/**
 * ROUTES: /application/verify
 * FUNCTION: verify for applications
 */
router.post("/verify", function (req, res) {
    // TODO: add rejection

    var application_id = req.body.application_id;

    connection.query(
        'UPDATE Applications SET is_approved = TRUE WHERE application_id = ?;',
        [application_id],
        (error, results, fields) => {
            if (error) {
                console.error('Error executing MySQL query: ' + error.stack);
                return res.status(500).send('Error executing MySQL query');
            }

            // Check if any rows were affected by the update
            if (results.affectedRows === 0) {
                return res.status(404).send('application does not exist');
            }

            // Send success response
            res.send('application verified');
        });


    // TODO: push notification;
});

/**
 * ROUTES: /application/
 * FUNCTION: get all the applications for the user
 */
router.get("/", function (req, res) {
    const query = 'SELECT * FROM Applications WHERE user_id = ?';
    var user_id = 1; // TODO: get user from token

    connection.query(
        query,
        [user_id],
        (error, results, fields) => {
            if (error) {
                console.error('Error executing MySQL query: ' + error.stack);
                return res.status(500).send('Error executing MySQL query');
            }

            // Check if any rows were affected by the update
            if (results.affectedRows === 0) {
                return res.status(404).send('activity does not exist');
            }

            // Send success response
            res.json(results);
        });


    // TODO: push notification;
});
module.exports = router;