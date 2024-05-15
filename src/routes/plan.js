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
router.post(
    "/", 
    // #swagger.tags = ['Plan']
    
    authMiddleware.authentication, planController.createPlan); // TODO: implement

/**
 * FUNCTION: get plan list
 */
//待修改
router.get(
    "/", 
    // #swagger.tags = ['Plan']
    
    authMiddleware.authentication, planController.getPlanList); // TODO: implement

/**
 * FUNCTION: get detail of a plan
 */
//待修改
router.get(
    "/:plan_id",
    // #swagger.tags = ['Plan']
    
    
    authMiddleware.authentication, planController.getPlanDetail); // TODO: implement

/**
 * FUNCTION: Update an existing plan by Id. Only the creator of the plan could call this endpoint.
 */
//待修改
router.patch(
    "/:plan_id", 
    // #swagger.tags = ['Plan']
    // #swagger.summary = '更新活動'
    // #swagger.description = '更新該單一活動'
    /* #swagger.responses[200] = { 
        description: "回傳更新後資料",
        schema: "plan updated"
        
    } */

    /* #swagger.responses[403] = { 
      description: "用戶通過驗證，但不是活動創立者，無權限",
      schema: { 
            error:  "You are not authorized to delete this plan"
        }
    } */

    /* #swagger.responses[404] = { 
        description: "未找到該活動",
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
//待修改
router.get(
    "/application/:application_id", 
    // #swagger.tags = ['Plan']
    
    authMiddleware.authentication, planController.getApplicationDetail);


/**
 * FUNCTION: verify for applications
 */
//待修改
router.patch(
    "/application/:application_id/approve", 
    // #swagger.tags = ['Plan']
    
    authMiddleware.authentication, planController.approve);

/**
 * FUNCTION: get all applications for a plan
 */
//待修改
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
            "is_approved": "boolean",
            "applicant_id": "待審核者id",
            "plan_id": "計畫id"
        }
      } */ 
    /* #swagger.responses[403] = { 
    description: "用戶通過驗證，但不是計畫創立者，無權限",
    schema: "not plan creator"
    } */

    /* #swagger.responses[404] = { 
    description: "未找到該用戶",
    schema: "Participants not found."
    } */
    
    authMiddleware.authentication, planController.getAllApplications);

/**
 * FUNCTION: apply for a plan
 */
//待修改
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
    schema:
        [{
            "participant_name": "參加者姓名",
            "createdAt": "datetime",
            "updatedAt": "datetime",
            "joined_activities": "參與計畫id",
            "participants": "參與者id"
        }]
    } */
    
    /* #swagger.responses[200] = { 
      description: "用戶成功加入，計畫不需審核",
      schema: "joined！"
    } */
    
    /* #swagger.responses[201] = { 
      description: "用戶成功發出計畫申請，待審核",
      schema: "Successfully send the application"
    } */

    /* #swagger.responses[403] = { 
      description: "用戶通過驗證，但為計畫創立者，不應該申請",
      schema: "Plan creator should not applied."
    } */


    /* #swagger.responses[404] = { 
      description: "該計畫不存在",
      schema: "Plan not found"
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
    // #swagger.description = '接受或拒絕該計畫的邀請'

    
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

