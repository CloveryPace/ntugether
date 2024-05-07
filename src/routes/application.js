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
router.get(
    "/:application_id", 
    // #swagger.tags = ['Activity']
    // #swagger.description = '活動創立者可以檢視特定審核'
    /* #swagger.responses[200] = { 
      description: "回傳特定審核id情況",
      schema: 
        {
            "application_id": 11,
            "application_response": "審核回覆",
            "is_approved": "true",
            "applicant_id": 16,
            "Applicant": "用戶資料",
            "Activity": "activity_id"
            
            
        }
      } */ 
    authMiddleware.authentication, applicationController.getApplicationDetail);

/**
 * ROUTES: /application/{applicationID}/approve
 * FUNCTION: verify for applications
 */
router.patch(
    "/:application_id/approve", 
    // #swagger.tags = ['Activity']
    // #swagger.description = '活動創立者可以進行問題審核，目前直接call這個API就會審核成功，自動將通過審核用戶加入活動參與者清單'
    /* #swagger.responses[200] = { 
      description: "審核成功，將通過審核用戶加入參與者清單",
      schema: {
            "message": "approved!",
          }
      } */
    authMiddleware.authentication, applicationController.approve);

module.exports = router;