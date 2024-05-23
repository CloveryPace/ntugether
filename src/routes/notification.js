const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/authentication');
const notifiationController = require("../controllers/notification_controller");

var router = express.Router();
router.use(bodyParser.json());

router.get(
  "",
  /*  
  #swagger.tags = ['Notification']
  #swagger.summary = 'Get notifications'
  #swagger.description = 'Get invitations, application informations for activity/plan. NOTE: The Activity invitation will return empty list for the activity invitation function has not been built'
  #swagger.parameters = {
      name: "contents",
      in: "query",
      description: "Determine which kind of content is returned, default=[invitation, application]. Allow contents: [invitation, application]",
      type: "list",
    },
  #swagger.parameters = {
      name: "types",
      in: "query",
      description: "Determine which kind of item is returned, default=[activity, plan]. Allow types: [activity, plan]",
      type: "list",
    },

  #swagger.responses[200] = {
    description: "success",
    schema:   
    {
      "invitation": {
        "plan": [
          {
            "invitation_id": 26,
            "accepted": false,
            "plan_id": 37,
            "invitee": 6,
            "Plan": {
              "plan_id": 37,
              "name": "Learning Plan",
              "goal": "Learn how to become a cow",
              "introduction": "Let's do it!",
              "progression": null,
              "start_date": "2024-03-21T00:00:00.000Z",
              "end_date": "2024-09-07T00:00:00.000Z",
              "application_problem": "hello?",
              "need_reviewed": false,
              "is_grouped": false,
              "createdAt": "2024-05-23T19:47:14.000Z",
              "updatedAt": "2024-05-23T19:47:14.000Z",
              "created_user_id": 6
            }
          }
        ],
        "activity": []
      },
      "application": {
        "plan": [
          {
            "invitation_id": 22,
            "accepted": false,
            "plan_id": 36,
            "invitee": 6,
            "Plan": {
              "plan_id": 36,
              "name": "Learning Plan",
              "goal": "Learn how to become a cow",
              "introduction": "Let's do it!",
              "progression": null,
              "start_date": "2024-03-21T00:00:00.000Z",
              "end_date": "2024-09-07T00:00:00.000Z",
              "application_problem": "hello?",
              "need_reviewed": false,
              "is_grouped": false,
              "createdAt": "2024-05-23T19:46:40.000Z",
              "updatedAt": "2024-05-23T19:46:40.000Z",
              "created_user_id": 7
            }
          },
        ],
        "activity": [
          {
            "application_id": 9,
            "application_response": "I want to join please!",
            "is_approved": false,
            "applicant_id": 7,
            "activity_id": 39,
            "Activity": {
              "activity_id": 39,
              "name": "Example Activity",
              "application_problem": "Are you happy?"
            }
          }
        ]
      }
    }
  }
  #swagger.responses[400] = { 
    description: "Invalid type or content format",
    schema: "invalid mode"
  } 
  */



  authMiddleware.authentication, notifiationController.getNotifications);

module.exports = router;
