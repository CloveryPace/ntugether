const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/authentication');
const planController = require('../controllers/plan_controller');

var router = express.Router();
router.use(bodyParser.json());

planController.sync();

/**
 * FUNCTION: create an plan
 */
router.post("/", authMiddleware.authentication, planController.createPlan); // TODO: implement

/**
 * FUNCTION: get plan list
 */
router.get("/", authMiddleware.authentication, planController.getPlanList); // TODO: implement

/**
 * FUNCTION: get detail of a plan
 */
router.get("/:plan_id", authMiddleware.authentication, planController.getPlanDetail); // TODO: implement

/**
 * FUNCTION: Update an existing plan by Id. Only the creator of the plan could call this endpoint.
 */
router.patch("/:plan_id", authMiddleware.authentication, planController.updatePlan); // TODO: implement

/**
 * FUNCTION: delete the plN. Only the creator of the plan could call this endpoint
 */
router.delete("/:plan_id", authMiddleware.authentication, planController.deletePlan); // TODO: implement


/**
 * FUNCTION: get application detail
 */
router.get("/application/:application_id", authMiddleware.authentication, planController.getApplicationDetail);


/**
 * FUNCTION: verify for applications
 */
router.patch("/application/:application_id/approve", authMiddleware.authentication, planController.approve);

/**
 * FUNCTION: get all applications for a plan
 */
router.get("/:plan_id/applications", authMiddleware.authentication, planController.getAllApplications);

/**
 * FUNCTION: apply for a plan
 */
router.post("/:plan_id/apply", authMiddleware.authentication, planController.applyPlan);

/**
 * FUNCTION: response to an invitation from a plan
 */
router.post("/:plan_id/invitation", authMiddleware.authentication, planController.respondToInvitation);

/**
 * FUNCTION: leave the plan given the plan
 */
router.patch("/:plan_id/leave", authMiddleware.authentication, planController.leavePlan); // TODO: implement


/**
 * ROUTES: /activity/{plan_id}/discussion
 * METHOD: GET
 * FUNCTION: get all discussion based on the order of timeline of specific activity, where the output is also controlled by offset and limit
 */
router.get("/:plan_id/discussion", planController.getDiscussion);

/**
 * ROUTES: /activity/{plan_id}/discussion
 * METHOD: POST
 * FUNCTION: discuess on an specific activity. User create or joined(approved by creator) can call this endpoint
 */
router.post("/:plan_id/discussion", authMiddleware.authentication, planController.makeDiscussion);

module.exports = router;

