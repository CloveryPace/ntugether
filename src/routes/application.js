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
    // #swagger.tags = ['Activity Application']
    // #swagger.description = '活動創立者可以檢視特定審核'
    /* #swagger.responses[200] = { 
      description: "回傳特定審核id情況",
      schema: 
        {
            "application_id": "審核id",
            "application_response": "審核回覆",
            "is_approved": "是否已被審核",
            "applicant_id": "審核者id",
            "Applicant": {
                    "用戶欄位": "用戶資訊"
                },
            "Activity": "待審核申請的活動id"
        }
      } */ 
      /* #swagger.responses[403] = { 
      description: "用戶通過驗證，但不是活動創立者，無權限",
      schema: "authorization failed"
      } */

    /* #swagger.responses[404] = { 
      description: "未找到該Application",
      schema:  'Application not found or has approved'
      } */
      

      
    authMiddleware.authentication, applicationController.getApplicationDetail);

/**
 * ROUTES: /application/{applicationID}/approve
 * FUNCTION: verify for applications
 */
router.patch(
    "/:application_id/approve", 
    // #swagger.tags = ['Activity Application']
    // #swagger.description = '活動創立者可以進行問題審核，目前直接call這個API就會審核成功，自動將通過審核用戶加入活動參與者清單'
    /* #swagger.responses[200] = { 
      description: "審核成功，將通過審核用戶加入參與者清單",
      schema: "approved!"
    } */
    /* #swagger.responses[400] = { 
      description: "該申請已被通過",
      schema: "application has been approved"
      } */

    /* #swagger.responses[403] = { 
    description: "用戶通過驗證，但不是活動創立者，無權限",
    schema: "authorization failed"
    } */

    /* #swagger.responses[404] = { 
      description: "未找到該Application",
      schema:  'Application not found'
    } */
    authMiddleware.authentication, applicationController.approve);


router.delete(
  "/:application_id/deleteApplication",
  // #swagger.tags = ['Activity Application']
  // #swagger.summary = '刪除活動審核申請'
  // #swagger.description = '活動創建者可以刪除審核申請'
  /* #swagger.responses[204] = { 
    description: "成功刪除審核",
    schema: "sucessfully delete"
    } */
  /* #swagger.responses[400] = { 
  description: "申請已被通過",
  schema: "application has been approved"
  } */

  /* #swagger.responses[403] = { 
  description: "用戶通過驗證，但不是活動創立者，無權限",
  schema: "not plan creator"
  } */

  /* #swagger.responses[404] = { 
  description: "未找到申請",
  schema: 
    "application not found"
  } */

  authMiddleware.authentication, applicationController.deleteApplication);

module.exports = router;