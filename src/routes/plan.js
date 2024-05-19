const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/authentication');
const planController = require('../controllers/plan_controller');
const progressController = require('../controllers/progress_controller');

var router = express.Router();
router.use(bodyParser.json());

planController.sync();
progressController.sync();

/**
 * FUNCTION: create an plan
 */
router.post(
    "/", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = '創立計畫'
    // #swagger.description = '創立一項計畫' 
    /* #swagger.parameters['body'] = {
      in: 'body',
      description: '創立計畫',
      schema: 
      {
          "name": "計畫名稱",
          "goal": "計畫目標",
          "introduction": "計畫介紹",
          "start_date": "2024-03-21",
          "end_date": "2024-09-07",
          "tags": ["Exam", "Exercise", "Learning"],
          "invitees": [],
          "progression": 
          [
            { "name": "進度名稱", "times": "次數", "need_activity": false }
          ],
          "need_reviewed": "boolean",
          "application_problem": "審查問題",

      }
  } */

     /* #swagger.responses[201] = { 
      description: "創立計畫成功",
      schema:
          {
              "message": "plan created"
          }
      
  } */
    
    authMiddleware.authentication, planController.createPlan); 

/**
 * FUNCTION: get plan list
 */
router.get(
    "/", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = '獲得計畫列表'
    // #swagger.description = 'API Document未完成'

    
    
    authMiddleware.authentication, planController.getPlanList); // TODO: implement

/**
 * FUNCTION: get detail of a plan
 */
//待修改
router.get(
    "/:plan_id",
    // #swagger.tags = ['Plan']
    // #swagger.summary = '獲得計畫細節'
    // #swagger.description = 'API Document未完成'
    
    
    authMiddleware.authentication, planController.getPlanDetail); // TODO: implement

/**
 * FUNCTION: Update an existing plan by Id. Only the creator of the plan could call this endpoint.
 */
router.patch(
    "/:plan_id", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = '更新計畫'
    // #swagger.description = '更新該單一計畫'
    /* #swagger.parameters['body'] = {
      in: 'body',
      description: '更新計畫',
      schema: 
      {
          "name": "計畫名稱",
          "goal": "計畫目標",
          "introduction": "計畫介紹",
          "start_date": "2024-03-21",
          "end_date": "2024-09-07",
          "tags": ["Exam", "Exercise", "Learning"],
          "invitees": [],
          "progression": {
            "english": 10,
            "chinese": 5,
          },
          "need_reviewed": "0",
          "application_problem": "審查問題",

      }
  } */

    /* #swagger.responses[403] = { 
      description: "用戶通過驗證，但不是計畫創立者，無權限",
      schema: { 
            error:  "You are not authorized to update this plan"
        }
    } */
    /* #swagger.responses[400] = { 
        description: "tag不符合格式",
        schema:  {
            "message": 'invalid tag' 
        }
    } */
    
    /* #swagger.responses[404] = { 
        description: "未找到該計畫",
        schema:  {
            error: 'Plan not found' 
        }
    } */
    
    authMiddleware.authentication, planController.updatePlan); // TODO: implement

/**
 * FUNCTION: delete the plN. Only the creator of the plan could call this endpoint
 */
router.delete(
    "/:plan_id", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = '刪除計畫'
    // #swagger.description = '刪除該單一計畫'
    /* #swagger.responses[204] = { 
      description: "已成功刪除計畫",
      schema: "sucessfully delete"
    } */

    /* #swagger.responses[403] = { 
      description: "用戶通過驗證，但不是計畫創立者，無權限",
      schema: { 
            error:  "You are not authorized to delete this plan"
        }
    } */

    /* #swagger.responses[404] = { 
        description: "未找到該計畫",
        schema:  {
            error: 'Plan not found' 
        }
    } */
    authMiddleware.authentication, planController.deletePlan); // TODO: implement


/**
 * FUNCTION: get application detail
 */

router.get(
    "/application/:application_id", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = '取得申請細節'
    // #swagger.description = '取得單一申請細節'


    /* #swagger.responses[200] = { 
    description: "回傳申請細節",
    schema: 
    {
      "application_id": "審核id",
      "application_response": "審核回覆",
      "is_approved": false,
      "applicant_id": "審核者id",
      "plan_id": "計畫id",
      "Applicant": {
        "申請者資料欄位": "申請者資料"
    },
      "Plan": {
        "plan_id": "計畫id"
      }
    }
    } 
    
    
    */



    /* #swagger.responses[403] = { 
    description: "用戶通過驗證，但不是計畫創立者，無權限",
    schema: "not plan creator"
    } */

    /* #swagger.responses[404] = { 
    description: "未找到申請",
    schema: "application not found"
    } */

    
    authMiddleware.authentication, planController.getApplicationDetail);


/**
 * FUNCTION: verify for applications
 */
router.patch(
    "/application/:application_id/approve", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = '通過計畫審核申請'
    // #swagger.description = '計畫創建者可以通過審核申請'
    /* #swagger.responses[200] = { 
      description: "通過審核",
      schema: "approved"
      } */ 
    /* #swagger.responses[400] = { 
    description: "申請已被通過",
    schema: "application has been approved"
    } */

    /* #swagger.responses[403] = { 
    description: "用戶通過驗證，但不是計畫創立者，無權限",
    schema: "not plan creator"
    } */

    /* #swagger.responses[404] = { 
    description: "未找到申請",
    schema: 
      "application not found"
    } */

    
    
    authMiddleware.authentication, planController.approve);

/**
 * FUNCTION: get all applications for a plan
 */

router.get(
    "/:plan_id/applications", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = '檢視審核列表'
    // #swagger.description = '計畫創建者可以檢視特定計畫的所有待審核列表'
    /* #swagger.responses[200] = { 
      description: "回傳待審核名單",
      schema: 
        {
            "application_id": "審核id",
            "application_response": "審核回覆",
            "is_approved": "是否已審核",
            "applicant_id": "待審核者id",
            "plan_id": "計畫id"
        }
      } */ 
    /* #swagger.responses[403] = { 
    description: "用戶通過驗證，但不是計畫創立者，無權限",
    schema: {
      "error": "not plan creator"
      }
    } */

    /* #swagger.responses[404] = { 
    description: "未找到該用戶",
    schema: "Participants not found."
    } */
    
    authMiddleware.authentication, planController.getAllApplications);

/**
 * FUNCTION: apply for a plan
 */

router.post(
    "/:plan_id/apply", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = "加入/申請計畫"
    // #swagger.description = '不論是否需要審核的計畫都是使用這個API，不須審核的將直接加入。所有用戶都可以call這個API，但是計畫建立者會被擋掉'
    /* #swagger.parameters['body'] = {
      in: 'body',
      description: '需要審核計畫的審核問題',
      schema: 
      {
        "application_response": "審核回覆",
      }
    } */

    /* #swagger.responses[200] = { 
      description: "回傳該計畫參與紀錄",
      schema: "joined!"
    } */   
    
    /* #swagger.responses[201] = { 
      description: "用戶成功發出計畫申請，待審核",
      schema: "Successfully send the application"
    } */

    /* #swagger.responses[400] = { 
      description: "用戶已加入",
      schema: "participant existed"
    } */

    /* #swagger.responses[403] = { 
      description: "用戶通過驗證，但為計畫創立者，不應該申請",
      schema: "Plan creator should not applied."
    } */

    /* #swagger.responses[404] = { 
      description: "該計畫不存在",
      schema: "Plan not found"
    } */

    /* #swagger.responses[409] = { 
      description: "申請者已存在",
      schema: "Applicant already exist."
    } */
    
    authMiddleware.authentication, planController.applyPlan);

/**
 * FUNCTION: response to an invitation from a plan
 */
//待修改
router.post(
    "/:plan_id/invitation", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = '接受/拒絕計畫邀請'
    // #swagger.description = '接受或拒絕該計畫的邀請，目前還有bug'

    
    authMiddleware.authentication, planController.respondToInvitation);

/**
 * FUNCTION: leave the plan given the plan
 */
router.patch(
    "/:plan_id/leave", 
    // #swagger.tags = ['Plan']
    // #swagger.description = '該功能尚未完成QQ'
    
    authMiddleware.authentication, planController.leavePlan); // TODO: implement


/**
 * ROUTES: /plan/{plan_id}/discussion
 * METHOD: GET
 * FUNCTION: get all discussion based on the order of timeline of specific activity, where the output is also controlled by offset and limit
 */
router.get(
    "/:plan_id/discussion", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = '取得計畫留言'
    // #swagger.description = '取得該計畫的留言'
    /* #swagger.parameters['limit'] = {
      in: 'query',
      description: '回傳資料數量限制，ex: limit=10, 限制前10筆',
      type: "integer",
      schema: "10"
    } */

    /* #swagger.parameters['offset'] = {
      in: 'query',
      description: '跳過資料數量限制，ex: offset=10，跳過前10筆',
      type: "int",
      schema: "0"
    } */

    /* #swagger.responses[200] = { 
    description: "回傳該計畫留言。包括該留言的資料，該留言會員資料以及計畫資料",
    schema:{
        "discussion_id": "留言id",
        "content": "留言內容",
        "sender_id": "留言用戶id",
        "plan_id": "留言的計畫id",
        "Sender": {
            "用戶細節": "..."
        },
        "plan": {
            "計畫細節": "..."
        }
    }
    } */

    /* #swagger.responses[404] = { 
      description: "計畫不存在",
      schema: "Plan not found"
    } */

    
    authMiddleware.authentication, planController.getDiscussion);

/**
 * ROUTES: /plan/{plan_id}/discussion
 * METHOD: POST
 * FUNCTION: discuess on an specific plan. User create or joined(approved by creator) can call this endpoint
 */
router.post(
    "/:plan_id/discussion", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = '建立計畫留言'
    // #swagger.description = '建立該計畫的留言'
    /* #swagger.parameters['content'] = {
      in: 'body',
      description: '留言內容',
      schema: 
      {
        "content": "string",
      }
    } */

    /* #swagger.responses[201] = { 
      description: "留言建立成功",
      schema: "discussion made"
    } */
    
    /* #swagger.responses[403] = { 
      description: "用戶通過驗證，但用戶未參加該計畫",
      schema: "User hasn't joined the plan"
    } */

    /* #swagger.responses[404] = { 
      description: "計畫不存在",
      schema: "Plan not found"
    } */
    
    
    authMiddleware.authentication, planController.makeDiscussion);

module.exports = router;

