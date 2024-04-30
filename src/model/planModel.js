const { sequelize, Sequelize } = require('../../database');
const User = require('./userModel');

const Plan = sequelize.define({
    plan_id: { 
        type: sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    name: { 
        type: sequelize.STRING(20) 
    },
    goal: { 
        type: sequelize.STRING(255) 
    },
    introduction: { 
        type: sequelize.TEXT 
    },
    created_user_id: { 
        type: sequelize.INTEGER 
    },
    progression: { 
        type: sequelize.TEXT 
    },
    startDate: { 
        type: sequelize.DATE 
    },
    endDate: { 
        type: sequelize.DATE 
    },
    applicationProblem: { 
        type: sequelize.STRING(255) 
    }
}, { sequelize, tableName: 'plan' });

Plan.belongsTo(User, { foreignKey: 'created_user_id', as: 'creator' });

const UserPlan = sequelize.define({
    userPlanId: { 
        type: sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    user_id: { 
        type: sequelize.INTEGER 
    },
    plan_id: { 
        type: sequelize.INTEGER 
    }
}, { sequelize, modelName: 'UserPlan' });
UserPlan.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
UserPlan.belongsTo(Plan, { foreignKey: 'plan_id', as: 'plan' });


const PlanTypes = sequelize.define({
    plan_type_id: { 
        type: sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    typeName: { 
        type: sequelize.STRING(20), 
        allowNull: false 
    }
}, { sequelize, tableName: 'PlanTypes' });

const PlanTypeAssociation = sequelize.define({
    plan_id: {
        type: sequelize.INTEGER
    },
    plan_type_id: {
        type: sequelize.INTEGER
    }
}, { tableName: 'PlanTypeAssociations'});
PlanTypeAssociation.belongsTo(Plan, { foreignKey: 'plan_id' });
PlanTypeAssociation.belongsTo(PlanTypes, { foreignKey: 'plan_type_id' });

const Plan_discussions = sequelize.define({
    discussion_id: { 
        type: sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    user_id: { 
        type: sequelize.INTEGER 
    },
    plan_id: { 
        type: sequelize.INTEGER 
    },
    content: { 
        type: sequelize.STRING(255) 
    }
}, { sequelize, tableName: 'Plan_discussions'});
Plan_discussions.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Plan_discussions.belongsTo(Plan, { foreignKey: 'plan_id', as: 'plan' });


module.exports = { Plan, PlanTypes, PlanTypeAssociation, Plan_discussions, UserPlan }





