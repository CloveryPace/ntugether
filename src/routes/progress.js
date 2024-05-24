const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/authentication');
const progressController = require('../controllers/progress_controller');

var router = express.Router();
router.use(bodyParser.json());

progressController.sync();


// GET routes
router.get("/:progress_id/userprocess", 
    // #swagger.tags = ['Progress']
    // #swagger.summary = '取得用戶進度'
    // #swagger.description = '取得單一用戶的單一計畫進度'
    

    /* #swagger.responses[200] = { 
      description: "取得用戶進度",
      schema: {
        "message": "User progress fetched successfully.",
        "單一用戶的計畫進度列表":
            {
                "userProgress_id": "用戶進度id",
                "description": "用度進度細項",
                "user_progress_date": "預期完成日期",
                "activity_detail": "揪團活動細節",
                "is_finished": "用戶進度計畫是否完成，可用來算次數",
                "user_id": "用戶id",
                "progress_id": "進度id",
                "createdAt": "2024-05-17T12:06:13.000Z",
                "updatedAt": "2024-05-17T12:06:13.000Z"
            }
        }
    } */

    /* #swagger.responses[404] = { 
      description: "該用戶進度不存在",
      schema: {
        "error": "No progress found for the given user."
      }
    } */

    /* #swagger.responses[500] = { 
      description: "其他錯誤",
      schema: {
        "error": "error.message"
      }
    } */
    
    
    
    
    authMiddleware.authentication, progressController.getUserProgress);

// GET routes
router.get("/:progress_id/alluserprocess",
    // #swagger.tags = ['Progress']
    // #swagger.summary = '取得該計畫所有用戶進度完成度'
    // #swagger.description = '輸入進度id，會取得該計畫的進度內所有用戶進度的完成情況，可以用於點進去計畫的頁面'
    /* #swagger.responses[200] = { 
      description: "取得計畫所有用戶進度",
      schema: {
        "message": "User progress fetched successfully.",
        "user_id-progress_id":
                 {
                    "user_id": "用戶id",
                    "progress_id": "進度id",
                    "user_name": "用戶名稱",
                    "progress_name": "進度名稱",
                    "finished_count": "完成次數",
                    "total_count": "總共次數"
                }
        }
    } */

    /* #swagger.responses[404] = { 
      description: "該計畫進度不存在",
      schema: {
        "error": "No progress found for the given process_id."
      }
    } */

    /* #swagger.responses[500] = { 
      description: "其他錯誤",
      schema: {
        "error": "error.message"
      }
    } */


    authMiddleware.authentication, progressController.getAllUserProgress);

// router.get("/:progress_id/oneuserprocess",
//   // #swagger.tags = ['Progress']
//   // #swagger.summary = '取得單一用戶參與的所有進度'
//   // #swagger.description = '輸入進度id，會取得該用戶所有進度資料'
  

//   /* #swagger.responses[404] = { 
//     description: "該計畫進度不存在",
//     schema: {
//       "error": "No progress found for the given process_id."
//     }
//   } */

//   /* #swagger.responses[500] = { 
//     description: "其他錯誤",
//     schema: {
//       "error": "error.message"
//     }
//   } */


//   authMiddleware.authentication, progressController.getOneUserProgress);

// POST routes
// router.post( 
//     progressController.createProgress);

// PUT routes

// router.put("/:progress_id", 
//     // #swagger.tags = ['Progress']
//     // #swagger.summary = '修改進度'
//     // #swagger.description = '修改該progress內容，僅計畫建立者可以修改'
//     /* #swagger.parameters['body'] = {
//       in: 'body',
//       description: '進度修改細項',
//       schema: 
//         {
//                 "name": "progress名稱",
//                 "times": "progress次數",
//                 "need_activity": "false/true"
//         }
//     } */

//     /* #swagger.responses[200] = { 
//       description: "進度修改成功",
//       schema: {
//         "message": "Progress updated successfully.",
//         "data": "updateProgress詳細資料"
//       }
//     } */

//     /* #swagger.responses[403] = { 
//       description: "用戶通過驗證，但用戶不是計劃創立者，沒有修改該進度的權限",
//       schema: {
//         "error": "You are not authorized to update this progress."
//       }
//     } */

//     /* #swagger.responses[404] = { 
//       description: "該進度不存在",
//       schema: {
//         "error": "Progress not found."
//       }
//     } */

//     /* #swagger.responses[500] = { 
//       description: "其他錯誤",
//       schema: {
//         "error": "error.message"
//       }
//     } */

//     authMiddleware.authentication, progressController.updateProgress);

// PUT routes

// router.put("/:userprogress_id/userprocess", 
//     // #swagger.tags = ['Progress']
//     // #swagger.summary = '修改用戶進度'
//     // #swagger.description = '修改該用戶進度內容，僅該用戶可以修改'
    

//     /* #swagger.responses[200] = { 
//       description: "進度修改成功",
//       schema: {
//         "message": "User Progress updated successfully.",
//         "data": "updateUserProgress詳細資料"
//       }
//     } */

//     /* #swagger.responses[403] = { 
//       description: "用戶通過驗證，但用戶不是進度創立者，沒有修改該用戶進度的權限",
//       schema: {
//         "error": "You are not authorized to update this user progress."
//       }
//     } */

//     /* #swagger.responses[404] = { 
//       description: "用戶進度不存在",
//       schema: {
//         "error": "User Progress not found."
//       }
//     } */

//     /* #swagger.responses[500] = { 
//       description: "其他錯誤",
//       schema: {
//         "error": "error.message"
//       }
//     } */
    
    
    
    
//     authMiddleware.authentication, progressController.updateUserProgress);

// router.post("/createuserprocess", progressController.createUserProgress)

module.exports = router;
