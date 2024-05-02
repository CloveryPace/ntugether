const { sequelize, Sequelize } = require('../../database');

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
    phoneNum: {
        type: Sequelize.STRING,
        allowNull: true, // modified
    },
    photo: {
        type: Sequelize.BLOB,
        allowNull: true, // modified
    },
    self_introduction: {
        type: Sequelize.TEXT,
        allowNull: true, // modified
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

const UserInterest = sequelize.define('UserInterests', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER
    },
    interest: {
        type: Sequelize.STRING(20)
    }

}, {
    sequelize,
    tableName: 'UserInterests'
});

module.exports = User;
