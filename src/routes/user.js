const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

var router = express.Router();
router.use(bodyParser.json());

const User = require('../model/userModel');
const userController = require('../controllers/user_controller');
// User.sync();
const authMiddleware = require('../middlewares/authentication');



// GET routes
router.get(
  "/",
  // swagger.description = "取得特定會員資料"
  // #swagger.tags = ['User']
  /* 
  #swagger.parameters['query'] = {
      in: 'query',
      description: '取得會員資料',
      required: true,
      schema: 
      {
          "name": "用戶名稱",
          "email": "用戶信箱"
      }
  } */
  
  /* #swagger.responses[200] = { 
      description: '用戶詳細資料',
      schema: 
      [{
        "members": "{ ... }"
      }]
    } */ 
  /* #swagger.responses[404] = { 
      description: "用戶不存在",
      schema: {
            "error": "User not found.",
          }
      } */
  /* #swagger.responses[500] = { 
      description: "網路或其他不明原因錯誤"
      } */

  userController.getMember
);

router.get(
  "/forgetPassword", 
  // #swagger.tags = ['User']
  // #swagger.description = '忘記密碼，輸入信箱後發送驗證碼'
  /* 
  
  /* #swagger.responses[200] = { 
      description: "忘記密碼驗證信發送成功",
      schema: {
            "message": "You have requested to reset your password. Please verify within 10 minute."
          }
      } */
  /* #swagger.responses[404] = { 
      description: "用戶不存在",
      schema: {
            "error": "User not found.",
          }
      } */
  /* #swagger.responses[500] = { 
      description: "網路或其他不明原因錯誤"
      } */
  
  userController.forgetPassword);

router.get(
  "/emailSend", 
  // swagger.description = "信箱註冊驗證碼發送"
  // #swagger.tags = ['User']
  /* 
  
  /* #swagger.responses[200] = { 
      description: "註冊驗證信發送成功",
      schema: {
            "message": "You have requested to reset your password. Please verify within 10 minute."
          }
      } */
  /* #swagger.responses[409] = { 
      description: "用戶已存在，請使用其他信箱",
      schema: {
            "error": "User already exists.",
          }
      } */
  /* #swagger.responses[500] = { 
      description: "網路或其他不明原因錯誤"
      } */
  
  userController.emailSend)

// POST routes
router.post(
  "/signup",
  // swagger.description = "註冊，請先至/user/emailSend取得驗證碼"
  // #swagger.tags = ['User']
  /* 
  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Sign up 內容',
      required: true,
      schema: 
      {
        "name": "用戶名稱",
        "email": "用戶信箱",
        "birthday": "2000-01-01",
        "gender": "male",
        "password": "any",
        "code": "驗證碼"
      }
  } */
  /* #swagger.responses[201] = { 
      description: "建立成功",
      schema: {
            "message": "Member created successfully.",
            "token": "JWT_token"
          }
      } */
  /* #swagger.responses[401] = { 
      description: "Invalid or expired verification code."
      } */
  /* #swagger.responses[409] = {
      description: "Email Conflict",
      schema: {
            "error": "Email already exists"
        }
      } */
  /* #swagger.responses[500] = { 
      description: "網路或其他不明原因錯誤"
      } */

userController.signUp);

router.post(
  "/signin",
  // swagger.description = "登入，請先確定已註冊成功" 
  // #swagger.tags = ['User']
  /* 
  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Sign in 內容',
      required: true,
      schema: 
      {
        "email": "用戶信箱",
        "password": "用戶密碼",
      }
  } */
  /* #swagger.responses[201] = { 
      description: "登入成功",
      schema: {
            "message": "Sign in successfully.",
            "token": "JWT_token"
          }
      } */
  /* #swagger.responses[401] = { 
      description: "密碼錯誤",
      schema: {
            "error": "Invalid credentials",
          }
      } */
  /* #swagger.responses[404] = { 
      description: "用戶不存在",
      schema: {
            "error": "User not found.",
          }
      } */
  /* #swagger.responses[500] = { 
      description: "網路或其他不明原因錯誤"
      } */

userController.signIn);


router.post(
  "/resetPassword",
  // swagger.description = "重設密碼，請確定已從/user/forgetPassword取得驗證碼"
  // #swagger.tags = ['User']
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: '收到驗證信後，重設密碼',
    required: true,
    schema: 
    {
      "email": "用戶信箱",
      "code": "驗證碼",
      "newPassword": "用戶新密碼"
    }
} */
/* #swagger.responses[200] = { 
    description: "密碼更改成功",
    schema: {
          "message": "Password reset successfully"
        }
    } */
/* #swagger.responses[401] = { 
    description: "驗證碼錯誤",
    schema: {
          "error": "Invalid or expired verification code",
        }
    } */
/* #swagger.responses[404] = { 
    description: "用戶不存在",
    schema: {
          "error": "User not found.",
        }
    } */
/* #swagger.responses[500] = { 
    description: "網路或其他不明原因錯誤"
    } */
  

  userController.resetPassword);

// PUT routes
router.put(
  "/", authMiddleware.authentication, 
  // swagger.description = "修改會員資料，請確定Authorization格式正確 'bearer '+ JWT token "
  // #swagger.tags = ['User']
  /* #swagger.security = [{
            "bearerAuth": [
              {
                type: 'http',
                scheme: 'bearer'
              }
            ]
    }] */
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: '更新會員資料',
      required: true,
      schema: 
      {
        "name": "用戶名稱",
        "phoneNum": "電話號碼",
        "gender": "性別",
        "aboutMe": "個人簡介"
      }
  } */
  /* #swagger.responses[200] = { 
      description: "會員資料更新成功",
      schema: {
            "message": "Member updated successfully",
          }
      } */
  /* #swagger.responses[401] = { 
      description: "使用者身分驗證錯誤",
      schema: {
            "message": "authorization fail"
          }
      } */
  /* #swagger.responses[404] = { 
      description: "請至少更新一行",
      schema: {
            "message": "Please update at least one row.",
          }
      } */
  /* #swagger.responses[500] = { 
      description: "網路或其他不明原因錯誤"
      } */

userController.updateMember);

// DELETE routes
router.delete(
  "/", authMiddleware.authentication, 
  // swagger.description = "刪除會員，請確定Authorization格式正確 'bearer '+ JWT token "
  // #swagger.tags = ['User']
  /* #swagger.security = [{
            "bearerAuth": [
              {
                type: 'http',
                scheme: 'bearer'
              }
            ]
    }] */

  /* #swagger.responses[200] = { 
      description: "會員刪除成功",
      schema: {
            "message": "Member deleted successfully",
          }
      } */
  /* #swagger.responses[401] = { 
      description: "使用者身分驗證錯誤",
      schema: {
            "message": "authorization fail",
          }
      } */
  /* #swagger.responses[404] = { 
      description: "會員不存在",
      schema: {
             "message": "Member not found.",
          }
      } */
  /* #swagger.responses[500] = { 
      description: "網路或其他不明原因錯誤"
      } */
  
  userController.deleteMember);


// Configure the Google strategy for use 
passport.use(new GoogleStrategy({
  clientID: process.env.googleClientID,
  clientSecret: process.env.googleClientSecret,
  callbackURL: "/user/oauth2callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ where: { oauthId: profile.id } });
      if (user) {
        return done(null, user);
      } else {
        const newUser = await User.create({
          oauthId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          oauthProvider: 'google'
        });
        return done(null, newUser);
      }
    } catch (error) {
      return done(error);
    }
  }
));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.use(session({
  secret: 'sdm_is_so_fun',
  resave: false,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

// Define routes
router.get('/auth/google',
// #swagger.description = 'Oauth註冊API，bug待修改'
// #swagger.tags = ['User']
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/oauth2callback',
// #swagger.description = 'Oauth註冊API，bug待修改'
// #swagger.tags = ['User']

  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/auth/failure', (req, res) => {
  // #swagger.description = 'Oauth註冊失敗，bug待修改'
  // #swagger.tags = ['User']
  res.send('Failed to authenticate.');
});

module.exports = router;
