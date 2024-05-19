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
  // #swagger.summary = '取得活動列表'
  // #swagger.description = '取得活動列表'

  /* #swagger.responses[400] = { 
    description: "mode 未填或不符合格式",
    schema: "invalid mode"
  } */


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
  // #swagger.summary = '創立活動' 
  // #swagger.description = '創立一項活動' 
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: '創立活動',
      schema: 
      {
          "name": "活動名稱",
          "introduction": "活動介紹",
          "date": "日期 or [日期]",
          "country": "縣市",
          "location": "地點",
          "type": "類別",
          "max_participants": "最大參與人數",
          "need_reviewed": "是否需要創立者審核",
          "is_one_time": "是否為一次性活動",
          "application_problem": "審核問題",
          "check_by_organizer": "是否需要創立者審查出席情況",
      }
  } */

  /* #swagger.responses[201] = { 
      description: "創立活動成功，回傳活動id",
      schema:
          {
              "message": "Successfully create an Activity",
              "activity_id": "活動id"
          }
      
  } */


  authMiddleware.authentication, activityController.createActivity);

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: get
 * FUNCTION: get detail of an activity
 */
router.get(
  "/:activity_id",
  // #swagger.tags = ['Activity']
  // #swagger.summary = '取得活動資料'
  // #swagger.description = '取得該單一活動的資料'
  /* #swagger.responses[200] = { 
      description: "回傳該活動相關資料",
      schema: 
          {
              "activity_id": "活動id",
              "name": "活動名稱",
              "introduction": "活動介紹",
              "date": "日期 or [日期]",
              "type": "類別",
              "country": "縣市",
              "location": "地點",
              "max_participants": "最大參與人數",
              "need_reviewed": false,
              "is_one_time": true,
              "application_problem": "審核問題",
              "check_by_organizer": true,
              "created_user_id": "創立者id",
              "Creator": {
                  "用戶欄位": "創立用戶資訊"
              },
              "Participants": [
                  {
                      "用戶欄位": "參與用戶資訊"
                  }
              ]
          }
      
  } */

  /* #swagger.responses[404] = { 
      description: "未找到該活動",
      schema:  {
          error: 'Activity not found' 
      }
  } */
  authMiddleware.authentication, activityController.getActivityDetail);

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: PATCH
 * FUNCTION: Update an existing activity by Id. Only the creator of the activity could call this endpoint.
 */
router.patch(
  "/:activity_id",
  // #swagger.tags = ['Activity']
  // #swagger.summary = '更新活動'
  // #swagger.description = '更新該單一活動'
  /* #swagger.responses[200] = { 
      description: "回傳update後資料",
      schema: {
          "name": "活動名稱",
          "introduction": "活動介紹",
          "date": "日期",
          "country": "縣市",
          "location": "地點",
          "max_participants": "最大參與人數",
          "need_reviewed": "是否需要創立者審核",
          "is_one_time": "是否為一次性活動",
          "application_problem": "審核問題",
          "check_by_organizer": "是否需要創立者審查出席情況"
      }
  } */

  /* #swagger.responses[403] = { 
    description: "用戶通過驗證，但不是活動創立者，無權限",
    schema: { 
          error:  "You are not authorized to update this activity"
      }
  } */

  /* #swagger.responses[404] = { 
      description: "未找到該活動",
      schema:  {
          error: 'Activity not found' 
      }
  } */

  authMiddleware.authentication, activityController.updateActivity);

/**
 * ROUTES: /activity/{activity_id}
 * METHOD: DELETE
 * FUNCTION: delete the activity. Only the creator of the activity could call this endpoint
 */
router.delete(
  "/:activity_id",
  // #swagger.tags = ['Activity']
  // #swagger.summary = '刪除活動'
  // #swagger.description = '刪除該單一活動'
  /* #swagger.responses[200] = { 
    description: "已成功刪除活動",
    schema: "sucessfully delete"
  } */

  /* #swagger.responses[403] = { 
    description: "用戶通過驗證，但不是活動創立者，無權限",
    schema: { 
          error:  "You are not authorized to delete this activity"
      }
  } */

  /* #swagger.responses[404] = { 
      description: "未找到該活動",
      schema:  {
          error: 'Activity not found' 
      }
  } */


  authMiddleware.authentication, activityController.deleteActivity);


/**
 * ROUTES: /activity/{activity_id}/application
 * METHOD: get
 * FUNCTION: Get all application for the specific activity. Only the creator of the activity could call this endpoint.
 */
router.get(
  "/:activity_id/application",
  // #swagger.tags = ['Activity']
  // #swagger.summary = '檢視審核列表'
  // #swagger.description = '活動創建者可以檢視特定活動的所有待審核列表'
  /* #swagger.responses[200] = { 
    description: "回傳待審核名單",
    schema: 
      {
          "application_id": "審核id",
          "application_response": "審核回覆",
          "is_approved": "boolean",
          "applicant_id": "待審核者id",
          "activity_id": "活動id"
      }
    } */
  /* #swagger.responses[403] = { 
  description: "用戶通過驗證，但不是活動創立者，無權限",
  schema: "not activity creator"
  } */

  /* #swagger.responses[404] = { 
  description: "未找到該Activity/Application",
  schema: "Activity/Application not found."
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
  // #swagger.summary = '移除活動參與者'
  // #swagger.description = '活動創建者移除活動中的用戶，一次移除一位'
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: '要移除的用戶id',
    schema: 
    {
      "remove_user_id": "用戶id"
    }
  } */

  /* #swagger.responses[204] = { 
  description: "已將該用戶移出活動",
  schema: "user removed"
  } */

  /* #swagger.responses[403] = { 
    description: "用戶通過驗證，但不是活動創立者，無權限",
    schema: "authorization failed"
  } */

  /* #swagger.responses[404] = { 
  description: "未找到該用戶",
  schema: "Participants not found."
  } */

  /* #swagger.responses[404] = { 
  description: "未找到該活動",
  schema: "Activity not found"
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
  // #swagger.summary = "加入/申請活動"
  // #swagger.description = '不論是否需要審核的活動都是使用這個API，不須審核的將直接加入。所有用戶都可以call這個API，但是活動建立者會被擋掉'
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: '需要審核活動的審核問題',
    schema: 
    {
      "application_response": "審核回覆",
    }
  } */
  

  /* #swagger.responses[200] = { 
    description: "用戶成功加入，活動不需審核",
    schema: "joined！"
  } */

  /* #swagger.responses[201] = { 
    description: "用戶成功發出活動申請，待審核",
    schema: "Successfully send the application"
  } */

  /* #swagger.responses[400] = { 
      description: "申請者已加入活動",
      schema: "applier has already joined"
  } */
  
  /* #swagger.responses[403] = { 
    description: "用戶通過驗證，但為活動創立者，不應該申請",
    schema: "Activity creator should not apply."
  } */


  /* #swagger.responses[404] = { 
    description: "該活動不存在",
    schema: "Activity not found"
  } */

  /* #swagger.responses[409] = { 
      description: "申請者已存在",
      schema: "Applicant already exist."
  } */
    


  authMiddleware.authentication, activityController.applyActivity);

router.get(
  "/:activity_id/participants",
  // #swagger.tags = ['Activity']
  // #swagger.summary = 取得活動參與者
  // #swagger.description = '回傳活動所有參與者'

  /* #swagger.responses[200] = { 
  description: "回傳該活動參與紀錄",
  schema:
      [{
          "createdAt": "datetime",
          "updatedAt": "datetime",
          "joined_activities": "參與活動id",
          "participants": "參與者id",
          "User": {
            "name": "參與者姓名"
          }
      }]
  } */

  /* #swagger.responses[404] = { 
    description: "該活動不存在",
    schema: "Activity not found"
  } */



  authMiddleware.authentication, activityController.getAllParticipants);

/**
 * ROUTES: /activity/{activity_id}/discussion
 * METHOD: GET
 * FUNCTION: get all discussion based on the order of timeline of specific activity, where the output is also controlled by offset and limit
 */
router.get(
  "/:activity_id/discussion",
  // #swagger.tags = ['Activity']
  // #swagger.summary = '取得活動留言'
  // #swagger.description = '取得該活動的留言'
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
  description: "回傳該活動留言。包括該留言資料，該留言會員資料以及活動資料",
  schema:{
      "discussion_id": "留言id",
      "content": "留言內容",
      "sender_id": "留言用戶id",
      "activity_id": "留言的活動id",
      "Sender": {
          "用戶細節": "..."
      },
      "Activity": {
          "活動細節": "..."
      }
  }
  } */

  /* #swagger.responses[404] = { 
    description: "活動不存在",
    schema: "Activity not found"
  } */



  authMiddleware.authentication, activityController.getDiscussion);

/**
 * ROUTES: /activity/{activity_id}/discussion
 * METHOD: POST
 * FUNCTION: discuess on an specific activity. User create or joined(approved by creator) can call this endpoint
 */
router.post(
  "/:activity_id/discussion",
  // #swagger.tags = ['Activity']
  // #swagger.summary = '建立活動留言'
  // #swagger.description = '建立該活動的留言'
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
    description: "用戶通過驗證，但用戶未參加該活動",
    schema: "User hasn't joined the activity"
  } */

  /* #swagger.responses[404] = { 
    description: "活動不存在",
    schema: "Activity not found"
  } */


  authMiddleware.authentication, activityController.makeDiscussion);

/**
 * ROUTES: /activity/leave
 * FUNCTION: leave from an activity 
 */
router.post(
  "/:activity_id/leave",
  // #swagger.tags = ['Activity']
  // #swagger.summary = '離開活動'
  // #swagger.description = '該功能尚未完成QQ'
  authMiddleware.authentication, activityController.leaveActivity);


module.exports = router;