const express = require('express');
const authMiddleware = require('../middlewares/authentication');
const bodyParser = require('body-parser');

// controller 
const activityController = require('../controllers/activity_controller');

var router = express.Router();
router.use(bodyParser.json());

activityController.sync();

// TODO: join and leave an activity
// TODO: type table
// TODO: long term activity
// TODO: filter type
// TODO: authorization

/**
 * ROUTES: /activity
 * METHOD: get
 * FUNCTION: get activity list
 * NOTE: probably should make people get activity list without authentication
 */
router.get("/", authMiddleware.authentication, activityController.getActivitiesList);

/**
 * ROUTE: /activity
 * METHOD: post
 * AUTH: JWT token
 * FUNCTION: create an activity
 */
router.post("/", authMiddleware.authentication, activityController.createActivity);

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: get
 * FUNCTION: get detail of an activity
 */
router.get("/:activity_id", authMiddleware.authentication, activityController.getActivityDetail);

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: PATCH
 * FUNCTION: Update an existing activity by Id. Only the creator of the activity could call this endpoint.
 */
router.patch("/:activity_id", authMiddleware.authentication, activityController.updateActivity);

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: DELETE
 * FUNCTION: delete the activity. Only the creator of the activity could call this endpoint
 */
router.delete("/:activity_id", authMiddleware.authentication, activityController.deleteActivity);


/**
 * ROUTES: /activity/{activity_id}/application
 * METHOD: get
 * FUNCTION: Get all application for the specific activity. Only the creator of the activity could call this endpoint.
 */
router.get("/:activity_id/application", authMiddleware.authentication, activityController.getAllApplications);


/**
 * ROUTES: /activity/{activity_id}/remove-user
 * METHOD: PATCH
 * FUNCTION: remove the join user for specific activity, only activity creator can do this
 */
router.patch("/:activity_id/remove-user", authMiddleware.authentication, activityController.removeUser);

/**
 * ROUTES: /activity/{activity_id}/apply
 * METHOD: POST
 * FUNCTION: join specific activity, except the user has joined it already
 */
router.post("/:activity_id/apply", authMiddleware.authentication, activityController.applyActivity);


/**
 * ROUTES: /activity/{activity_id}/discussion
 * METHOD: GET
 * FUNCTION: get all discussion based on the order of timeline of specific activity, where the output is also controlled by offset and limit
 */
router.get("/:activity_id/discussion", authMiddleware.authentication, activityController.getDiscussion);

/**
 * ROUTES: /activity/{activity_id}/discussion
 * METHOD: POST
 * FUNCTION: discuess on an specific activity. User create or joined(approved by creator) can call this endpoint
 */
router.post("/:activity_id/discussion", authMiddleware.authentication, activityController.makeDiscussion);

/**
 * ROUTES: /activity/leave
 * FUNCTION: leave from an activity 
 */
router.post("/:activity_id/leave", authMiddleware.authentication, activityController.leaveActivity);


module.exports = router;