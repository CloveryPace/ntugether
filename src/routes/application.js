const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/authentication');
const applicationController = require('../controllers/application_controller');

var router = express.Router();

router.use(bodyParser.json());

/**
 * ROUTES: /application/{applicationID}
 * METHOD: GET
 * FUNCTION: get application detail
 */
router.get("/:application_id", authMiddleware.authentication, applicationController.getApplicationDetail);


/**
 * ROUTES: /application/{applicationID}/approve
 * FUNCTION: verify for applications
 */
router.patch("/:application_id/approve", authMiddleware.authentication, applicationController.approve);

module.exports = router;