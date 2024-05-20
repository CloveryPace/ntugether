const { sequelize, Sequelize } = require('../../database');
const planModel = require("../model/planModel");
const User = require('./userModel');

const Progress = sequelize.define("Progress", {
    progress_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(20)
    },
    times: {
        type: Sequelize.INTEGER,
        
    },
    need_activity: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    
}, { sequelize, tableName: 'progress' });

Progress.belongsTo(planModel.Plan, { as: 'Plan', foreignKey: 'plan_id', allowNull: false });
planModel.Plan.hasMany(Progress, { as: "progresses", foreignKey: "plan_id" });


const UserProgress = sequelize.define("UserProgress", {
    userProgress_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING(255)
    },
    user_progress_date: {
        type: Sequelize.DATE
    },
    activity_detail: {
        type: Sequelize.STRING(255)
    },
    is_finished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // table name of User model
            key: 'user_id' // primary key in User model
        }
    },
    progress_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'progress', // table name of Progress model
            key: 'progress_id' // primary key in Progress model
        }
    }
}, { sequelize, tableName: 'UserProgress' });

UserProgress.belongsTo(User, { foreignKey: 'user_id', as: 'Users' });
UserProgress.belongsTo(Progress, { foreignKey: 'progress_id', as: 'progress' });

User.hasMany(UserProgress, { foreignKey: 'user_id', as: 'userProgresses' });
Progress.hasMany(UserProgress, { foreignKey: 'progress_id', as: 'userProgresses' });



module.exports = {
    Progress, UserProgress
};


