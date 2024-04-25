const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { log } = require('console');
const { loadEnvFile } = require('process');

var router = express.Router();

router.use(bodyParser.json());

// Create a connection pool to the MySQL server
const connection = require('../../database');

/**
 * ROUTES: /application/{applicationID}
 * METHOD: GET
 * FUNCTION: get application detail
 */
router.get("/:applicationID", function (req, res) {
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


/**
 * ROUTES: /application/{applicationID}/approve
 * FUNCTION: verify for applications
 */
router.post("/:applicationID/approve", function (req, res) {
    // TODO: add rejection
    // TODO: add to applicants table

    var application_id = req.body.application_id;
    var long_term_activity_id = req.body?.long_term_activity_id;

    var applicant_id = null;
    var activity_id = null;

    connection.query('SELECT applicant_id, activity_id FROM Applications WHERE application_id = ?', [application_id], (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query: ' + error.stack);
            return;
        }

        // Check if any rows were returned
        if (results.length === 0) {
            console.log('No data found for application_id = 1');
            return;
        }

        // Extract the applicant_id from the result
        applicantId = results[0].applicant_id;
        activity_id = results[0].activity_id;
    });


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


    connection.query(
        'INSERT INTO ActivityParticipantStatus(activity_id, long_term_activity_id, participant_id) VALUES (?, ?, ?)',
        [activity_id, long_term_activity_id, applicant_id],
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
            res.send('application added');
        });

});

module.exports = router;