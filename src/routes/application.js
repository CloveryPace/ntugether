const express = require('express');
const bodyParser = require('body-parser');
const applicationController = require('../controllers/application_controller');

var router = express.Router();

router.use(bodyParser.json());

// Create a connection pool to the MySQL server
const connection = require('../../database');

/**
 * ROUTES: /application/{applicationID}
 * METHOD: GET
 * FUNCTION: get application detail
 */
router.get("/:application_id", applicationController.getApplicationDetail);


/**
 * ROUTES: /application/{applicationID}/approve
 * FUNCTION: verify for applications
 */
router.patch("/:application_id/approve", applicationController.approve);

module.exports = router;