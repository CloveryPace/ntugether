const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// controller 
const activityController = require('../controllers/activity_controller');

var router = express.Router();

router.use(bodyParser.json());

// TODO: join and leave an activity
// TODO: type table
// TODO: long term activity
// TODO: filter type
// TODO: authorization


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
 * ROUTES: /activity
 * METHOD: get
 * FUNCTION: get activity list
 */
router.get("", activityController.getActivitiesList(req, res));

/**
 * ROUTE: /activity
 * METHOD: post
 * FUNCTION: create an activity
 */
router.post("", (req, res) => {

    const query =
        'INSERT INTO \
    Activities(name, introduction, date, location, max_participants, need_reviewed, is_one_time, created_user_id, check_by_organizer) \
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

    var created_user_id = 1; // TODO: get it from token

    var { name, introduction, date, location, max_participants, need_reviewed, is_one_time, check_by_organizer } = req.body;

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

    // add applicant to ActivityParticipantStatus
});

/**
 * ROUTES: /activity/{activityID}
 * METHOD: get
 * FUNCTION: get detail of an activity
 */
router.get("/:activityID", (req, res) => {
    var activityID = req.params.activityID;

    connection.query(
        'SELECT * FROM Activities WHERE activity_id = ?',
        [activityID],
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
 * ROUTES: /activity/{activityID}
 * METHOD: PATCH
 * FUNCTION: Update an existing activity by Id. Only the creator of the activity could call this endpoint.
 */
router.patch("/:activityID", (req, res) => { // FIXME: error might occurs
    var activityID = req.params.activityID;
    const { ...newData } = req.body;

    // Generate the SET clause for the SQL query
    const setClause = Object.keys(...newData).map(key => `${key} = ?`).join(', '); // "key1 = ?, key2 = ?, key3 = ?"

    // Generate the values array for the SQL query
    const values = Object.values(newData);

    // Execute the query to update the activity
    connection.query(`UPDATE Activities SET ${setClause} WHERE activity_id = ?`, [...values, activityID], (error, results) => {
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

/**
 * UNDONE:
 * ROUTES: /activity/{activityID}
 * METHOD: DELETE
 * FUNCTION: delete the activity. Only the creator of the activity could call this endpoint
 */
router.delete("/:activityID", activityController.deleteActivity(req, res));


/**
 * ROUTES: /activity/{activityID}/application
 * METHOD: get
 * FUNCTION: Get all application for the specific activity. Only the creator of the activity could call this endpoint.
 */
router.get("/activity/:activityID/application", activityController.getAllApplications(req, res));


/**
 * ROUTES: /activity/{activityID}/remove-user
 * METHOD: PATCH
 * FUNCTION: remove the join user for specific application, only activity creator can do this
 */
router.patch("/activity/:activityID/remove-user", activityController.removeUser(req, res));

/**
 * ROUTES: /activity/{activityID}/apply
 * METHOD: POST
 * FUNCTION: join specific activity, except the user has joined it already
 */
router.post("/activity/:activityID/apply", activityController.applyActivity(req, res));

/**
 * ROUTES: /activity/{activityID}/discussion
 * METHOD: GET
 * FUNCTION: get all discussion based on the order of timeline of specific activity, where the output is also controlled by offset and limit
 */
router.get("/activity/:activityID/discussion", activityController.getDiscussion(req, res));

/**
 * ROUTES: /activity/{activityID}/discussion
 * METHOD: POST
 * FUNCTION: discuess on an specific activity. User create or joined(approved by creator) can call this endpoint
 */
router.post("/activity/:activityID/discussion", activityController.makeDiscussion(req, res));

/**
 * ROUTES: /activity/leave
 * FUNCTION: leave from an activity 
 */
router.post("/leave", function (req, res) {

    var activity_id = req.body.activity_id; // Assuming activity_id and value are sent in the POST body
    var long_term_activity_id = req.body?.long_term_activity_id;
    var participant_id = req.body.participant_id;
    connection.query('DELETE FROM ActivityParticipantStatus WHERE participant_id = ? AND activity_id = ? AND long_term_activity_id = ?;',
        [participant_id, activity_id, long_term_activity_id],
        (error, results, fields) => {
            if (error) {
                console.error('Error executing MySQL query: ' + error.stack);
                return res.status(500).send('Error executing MySQL query');
            }
            // Send success response
            res.send('leaved');
        });

});

/**
 * ROUTES: /activity/filter-with-location
 * FUNCTION: get activities with location specified
 */
router.post("/filter-with-location", (req, res) => {
    var { location } = req.body; // TODO: get user from token

    connection.query(
        'SELECT * FROM Activities WHERE location = ?',
        [location],
        (error, results, fields) => {
            if (error) {
                console.error('Error executing MySQL query: ' + error.stack);
                return res.status(500).send('Error executing MySQL query');
            }

            // Send success response
            res.json(results);
        });

});


module.exports = router;