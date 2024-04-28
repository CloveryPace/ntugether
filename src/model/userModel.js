const { sequelize, Sequelize } = require('../../database');
const { DataTypes } = require('sequelize');


// Define a User model
const User = sequelize.define('User', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATEONLY
    },
    gender: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.BLOB
    },
    self_introduction: {
        type: Sequelize.TEXT
    },
    oauthProvider: {
        type: Sequelize.STRING
    },
    oauthId: {
        type: Sequelize.STRING
    },
    verified: {
        type: Sequelize.BOOLEAN
    }
}, {
    // Sequelize options
    tableName: 'Users', // Explicitly specifying the table name here
    timestamps: false // assuming your table does not have fields like createdAt or updatedAt
});

module.exports = User;
