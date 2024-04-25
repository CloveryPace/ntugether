const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger-output.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
require('dotenv').config();

var router = express.Router();
router.use(bodyParser.json());

const connection = require('../../database');
const User = require('../model/userModel');

// GET routes
router.get("/", getMember);
router.get("/", getMember);
router.get("/signin", signIn);
router.get("/forgetPassword", forgetPassword);

// POST routes
router.post("/signup", signUp);
router.post("/resetPassword", resetPassword);

// PUT routes
router.put("/", updateMember);
router.put("/emailVerify", emailVerify);

// DELETE routes
router.delete("/", deleteMember);


// Configure the Google strategy for use 
passport.use(new GoogleStrategy({
  clientID: process.env.googleClientID,
  clientSecret: process.env.googleClientSecret,
  callbackURL: "/user/oauth2callback"
},
(accessToken, refreshToken, profile, done) => {
  try{
    //  Check for existing user
    connection.query('SELECT * FROM Users WHERE oauthId = ?', [profile.id], (err, existingUsers) => {
    if (existingUsers.length > 0) {
      return done(null, existingUsers[0]);
    } else {
    // if not, create new user in our db
      connection.query('INSERT INTO Users (oauthId, email, name, oauthProvider) VALUES (?, ?, ?, "google")', [profile.id, profile.emails[0].value, profile.displayName], (err, result) => {
      const newUser = {
        // id: result.insertId,
        oauthId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName
      };
      return done(null, newUser);
      });
    }
  });
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

// Define routes.
router.get('/auth/google',
passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/oauth2callback', 
passport.authenticate('google', { failureRedirect: '/auth/failure' }),
(req, res) => {
  // Successful authentication, redirect home.
  console.log("successful authentication");
  res.redirect('/');
});

router.get('/auth/failure', (req, res) => {
res.send('Failed to authenticate.');
});

const SECRET_KEY = 'sdm_is_so_fun';

function generateVerificationCode(email) {
  const timestamp = Math.floor(Math.floor(Date.now() / 1000) / 600) // Current time in seconds
  const hash = crypto.createHmac('sha256', SECRET_KEY)
                     .update(email + timestamp)
                     .digest('hex');
  const code = hash.substring(0, 6); // Take first 6 characters for simplicity
  return { code, timestamp };
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.Email,
    pass: process.env.Password
  }
});

async function signUp(req, res) {
  try {
    const { name, email, password } = req.query;
    console.log("email", email);
    console.log("name", name);
    console.log("password", password);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user using Sequelize
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    console.log(newUser.id); // Assuming 'id' is the auto-generated field for user_id

    // Create json web token
    const token = jwt.sign(
      { userId: newUser.id }, // Use the newly created user's id
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN } // JWT_EXPIRES_IN is the duration of the token
    );

    const { code, timestamp } = generateVerificationCode(email);
    // Example email sending code with nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.Email,
        pass: process.env.Password
      }
    });
  
    const mailOptions = {
      from: process.env.Email,
      to: email,
      subject: 'NTUgether Email Verification',
      text: `Your verification code is: ${code}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Error sending email');
      } else {
        res.send('Verification code sent to your email. Please verify within 10 minutes.');
        return res.status(201).json({
          message: 'Member created successfully, verification email sent',
          token: token, // JWT token
        });
      }
    });


  } catch (error) {
    console.log(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function emailVerify(req, res) {
  const { email, code } = req.body;
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Re-generate the code based on the current timestamp and compare
  const { code: validCode, timestamp } = generateVerificationCode(email);
  console.log(validCode, timestamp);
  console.log(code, currentTimestamp);

  if (code === validCode) {
    try {
      // Use Sequelize to update the verified status for the user
      const result = await User.update(
        { verified: true },
        { where: { email: email } }
      );

      if (result[0] > 0) { // result[0] contains the number of affected rows
        res.send('Email verified successfully');
      } else {
        // No rows were updated, which means no user was found with that email
        res.status(404).send('No user found with that email');
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send('Error updating user verification status');
    }
  } else {
    res.status(401).send('Invalid or expired verification code');
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.query; // Extracting email and password from request query
    console.log("email", email);
    console.log("password", password);

    // Use Sequelize to find the user by email
    const user = await User.findOne({
      where: { 
        email: email,

      },
      attributes: ['user_id', 'password'], // Select only the user_id and password fields
    });

    if (!user) {
      // If no user found with that email
      console.log("User does not exist");
      return res.status(404).json({ error: "User does not exist" });
    }
    const { user_id: userId, password: hashedPassword } = user;

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Passwords match, create JWT token
    const token = jwt.sign(
      { userId: userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN } // Use the same JWT expiry as in signUp
    );
    console.log('jwt token', token);

    // Successfully authenticated
    return res.status(200).json({
      message: 'Authentication successful',
      jwtToken: token,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error during authentication" });
  }
}

async function forgetPassword(req, res){
  try{
    const {email} = req.query;
    console.log(email);

    const user = await User.findOne({where: {email: email }});

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const { code, timestamp } = generateVerificationCode(email);
    
    const mailOptions = {
      from: process.env.Email,
      to: email,
      subject: 'Password Reset Request',
      text: `You have requested to reset your password. Your verification code is: ${code}.
      Please verify within 10 minute.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error){
        console.log(error);
        return res.status(500).send('Error sending email');
      } else{
        return res.status(200).json({
          message: 'Password reset email sent,  Please verify within 10 minute.',
        });
      }
    })
  } catch(error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }

}

async function resetPassword(req, res){
  try{
    const {email, code, newPassword} = req.body;
    
    const user = await User.findOne({where: {email: email}});
    if(!user){
      return res.status(404).send('User not found')
    }

    const { code: validCode, timestamp } = generateVerificationCode(email);
    // console.log(validCode, timestamp);
    // console.log(code);
    if (code === validCode) {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const result = await User.update({password: hashedPassword}, {where: {email: email}});
  
        if (result[0] > 0) {
          res.send('Password reset successfully');
        } else {
          res.status(404).send('No user found with that email');
        }
      
    } else {
      res.status(401).send('Invalid or expired verification code');
    }

    
    
  } catch(error){
    console.log(error);
    res.status(500).send('Internal server error');
  }
}


async function getMember(req, res) {
  const {name, email} = req.query; 
  console.log("name", name);

  await User.findOne({
    where:{
      name: name,
      email: email
    } 
  })
  .then(results => {
    
    if (results){
      res.json({members: results});

    } else {
      res.status(200).send("No member found.");
    }
  })
  .catch(error => {
    console.error("Error querying the database:", error);
    res.status(500).send("Internal Server Error");
  });
}

async function updateMember(req, res) {
  const { user_id, name, email } = req.body;

  try {
    // Update the user
    const [updatedRows] = await User.update({ name, email }, { where: { user_id } });

    if (updatedRows > 0) {
      res.status(200).send('Member updated successfully');
    } else {
      res.status(404).send('Member not found');
    }
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function deleteMember(req, res) {
  const { user_id } = req.body; // Get the id of the member to delete

  try {
    const affectedRows = await User.destroy({where: { user_id }})
    if (affectedRows > 0) {
      res.status(200).send('Member deleted successfully');
    } else{
      res.status(404).send('Member not found');
    } 
  } catch(error){
    console.log('Error deleting member:', error);
    res.status(500).send('Internal Server Error')
  }
}

module.exports = router;