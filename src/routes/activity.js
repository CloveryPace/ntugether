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
router.post("", activityController.createActivity(req, res));

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: get
 * FUNCTION: get detail of an activity
 */
router.get("/:activity_id", activityController.getActivityDetail(req, res));

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: PATCH
 * FUNCTION: Update an existing activity by Id. Only the creator of the activity could call this endpoint.
 */
router.patch("/:activity_id", activityController.updateActivity(req, res));

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: DELETE
 * FUNCTION: delete the activity. Only the creator of the activity could call this endpoint
 */
router.delete("/:activity_id", activityController.deleteActivity(req, res));


/**
 * ROUTES: /activity/{activity_id}/application
 * METHOD: get
 * FUNCTION: Get all application for the specific activity. Only the creator of the activity could call this endpoint.
 */
router.get("/activity/:activity_id/application", activityController.getAllApplications(req, res));


/**
 * ROUTES: /activity/{activity_id}/remove-user
 * METHOD: PATCH
 * FUNCTION: remove the join user for specific activity, only activity creator can do this
 */
router.patch("/activity/:activity_id/remove-user", activityController.removeUser(req, res));

/**
 * ROUTES: /activity/{activity_id}/apply
 * METHOD: POST
 * FUNCTION: join specific activity, except the user has joined it already
 */
router.post("/activity/:activity_id/apply", activityController.applyActivity(req, res));

/**
 * ROUTES: /activity/{activity_id}/discussion
 * METHOD: GET
 * FUNCTION: get all discussion based on the order of timeline of specific activity, where the output is also controlled by offset and limit
 */
router.get("/activity/:activity_id/discussion", activityController.getDiscussion(req, res));

/**
 * ROUTES: /activity/{activity_id}/discussion
 * METHOD: POST
 * FUNCTION: discuess on an specific activity. User create or joined(approved by creator) can call this endpoint
 */
router.post("/activity/:activity_id/discussion", activityController.makeDiscussion(req, res));

/**
 * ROUTES: /activity/leave
 * FUNCTION: leave from an activity 
 */
router.post("/leave", activityController.leaveActivity(req, res));


module.exports = router;