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
 * ROUTES: /activity/create
 * FUNCTION: creaet a new activity
 */
router.post("/create-one-time", (req, res) => {

    const query =
        'INSERT INTO \
    Activities(name, introduction, date, location, max_participants, need_reviewed, is_one_time, created_user_id, check_by_organizer) \
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

    var is_one_time = true;
    var created_user_id = 1; // TODO: get it from token

    var { name, introduction, date, location, max_participants, need_reviewed, is_one_time, created_user_id, check_by_organizer } = req.body;

    // NOTE: the applicant_id is set as 1 tempororily
    connection.query(
        query,
        [name, introduction, date, location, max_participants, need_reviewed, is_one_time, created_user_id, check_by_organizer],
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
            res.send('activity created');
        });
});

/**
 * ROUTES: /activity/get-info
 * FUNCTION: get one activity information
 */
router.post("/get-info", (req, res) => {
    var { activity_id } = req.body; // TODO: get user from token

    connection.query(
        'SELECT * FROM Activities WHERE activity_id = ?',
        [activity_id],
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

});

/**
 * ROUTES: /activity/get-list-infos
 * FUNCTION: get 2 random activities for the user // NOTE: this should be changed
 */
router.get("/get-list-infos", (req, res) => {

    connection.query(
        'SELECT * FROM Activities',
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
            first_two_activities = results.slice(0, 2);
            res.json(first_two_activities);
        });

});


/**
 * ROUTES: /activity/edit
 * FUNCTION: edit activity data
 */
router.patch("/edit", (req, res) => {
    const { activity_id, ...newData } = req.body;

    // Generate the SET clause for the SQL query
    const setClause = Object.keys(...newData).map(key => `${key} = ?`).join(', '); // "key1 = ?, key2 = ?, key3 = ?"

    // Generate the values array for the SQL query
    const values = Object.values(newData);

    // Execute the query to update the activity
    connection.query(`UPDATE Activities SET ${setClause} WHERE activity_id = ?`, [...values, activity_id], (error, results) => {
        if (error) {
            console.error('Error updating activity:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if any rows were affected by the update
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        // Send success response
        res.json({ message: 'Activity updated successfully' });
    });
});

module.exports = router;