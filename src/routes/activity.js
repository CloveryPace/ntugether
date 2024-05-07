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
router.get(
    "/", 
    // #swagger.tags = ['Activity']
    authMiddleware.authentication, activityController.getActivitiesList);

/**
 * ROUTE: /activity
 * METHOD: post
 * AUTH: JWT token
 * FUNCTION: create an activity
 */
router.post(
    "/", 
    // #swagger.tags = ['Activity']
    authMiddleware.authentication, activityController.createActivity);

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: get
 * FUNCTION: get detail of an activity
 */
router.get(
    "/:activity_id",
    // #swagger.tags = ['Activity']
    authMiddleware.authentication, activityController.getActivityDetail);

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: PATCH
 * FUNCTION: Update an existing activity by Id. Only the creator of the activity could call this endpoint.
 */
router.patch(
    "/:activity_id", 
    // #swagger.tags = ['Activity']
    authMiddleware.authentication, activityController.updateActivity);

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: DELETE
 * FUNCTION: delete the activity. Only the creator of the activity could call this endpoint
 */
router.delete(
    "/:activity_id", 
    // #swagger.tags = ['Activity']
    authMiddleware.authentication, activityController.deleteActivity);


/**
 * ROUTES: /activity/{activity_id}/application
 * METHOD: get
 * FUNCTION: Get all application for the specific activity. Only the creator of the activity could call this endpoint.
 */
router.get(
    "/:activity_id/application", 
    // #swagger.tags = ['Activity']
    // #swagger.description = '活動創建者可以檢視特定活動的所有待審核列表'
    /* #swagger.responses[200] = { 
      description: "回傳待審核名單",
      schema: 
        {
            "application_id": "待審核者id",
            "application_response": "審核回覆",
            "is_approved": true,
            "applicant_id": 16,
            "activity_id": 3
        }
      } */ 
    authMiddleware.authentication, activityController.getAllApplications);


/**
 * ROUTES: /activity/{activity_id}/remove-user
 * METHOD: PATCH
 * FUNCTION: remove the join user for specific activity, only activity creator can do this
 */
router.patch(
    "/:activity_id/remove-user", 
    // #swagger.tags = ['Activity']
    // #swagger.description = '活動創建者移除活動中的用戶'
    /* #swagger.parameters['body'] = {
      in: 'body',
      description: '要移除的用戶id',
      schema: 
      {
        "remove_user_id": "用戶id"
      }
  } */
    authMiddleware.authentication, activityController.removeUser);

/**
 * ROUTES: /activity/{activity_id}/apply
 * METHOD: POST
 * FUNCTION: join specific activity, except the user has joined it already
 */
router.post(
    "/:activity_id/apply", 
    // #swagger.tags = ['Activity']
    // #swagger.description = '不論是否需要審核的活動都是使用這個API，不須審核的將直接加入。所有用戶都可以call這個API，但是活動建立者會被擋掉'
    /* #swagger.parameters['body'] = {
      in: 'body',
      description: '需要審核活動的審核問題',
      schema: 
      {
        "application_response": "審核回覆",
      }
  } */
    
    
    authMiddleware.authentication, activityController.applyActivity);

router.get(
    "/:activity_id/participants", 
    // #swagger.tags = ['Activity']
    // #swagger.description = '回傳活動所有參與者，目前只有ID，無法回傳參與者名稱'
     

    authMiddleware.authentication, activityController.getAllParticipants);

/**
 * ROUTES: /activity/{activity_id}/discussion
 * METHOD: GET
 * FUNCTION: get all discussion based on the order of timeline of specific activity, where the output is also controlled by offset and limit
 */
router.get(
    "/:activity_id/discussion", 
    // #swagger.tags = ['Activity']
    authMiddleware.authentication, activityController.getDiscussion);

/**
 * ROUTES: /activity/{activity_id}/discussion
 * METHOD: POST
 * FUNCTION: discuess on an specific activity. User create or joined(approved by creator) can call this endpoint
 */
router.post(
    "/:activity_id/discussion", 
    // #swagger.tags = ['Activity']
    authMiddleware.authentication, activityController.makeDiscussion);

/**
 * ROUTES: /activity/leave
 * FUNCTION: leave from an activity 
 */
router.post(
    "/:activity_id/leave", 
    // #swagger.tags = ['Activity']
    authMiddleware.authentication, activityController.leaveActivity);


module.exports = router;