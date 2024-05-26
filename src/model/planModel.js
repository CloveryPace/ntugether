const { defaultValueSchemable } = require('sequelize/lib/utils');
const { sequelize, Sequelize } = require('../../database');
const User = require('./userModel');
const { DataTypes } = require('sequelize');



const PlanParticipantsStatus = sequelize.define('PlanParticipantsStatus');
const PlanTypeAssociation = sequelize.define("PlanTypeAssociation");
/* =========================== Activities Table =================================== */

const Plan = sequelize.define("Plan", {
    plan_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(20)
    },
    goal: {
        type: Sequelize.STRING(255)
    },
    introduction: {
        type: Sequelize.TEXT
    },
    // This field should probably relate to a Progress Table
    progression: {
        type: Sequelize.TEXT
    },
    start_date: {
        type: Sequelize.DATE
    },
    end_date: {
        type: Sequelize.DATE
    },
    application_problem: {
        type: Sequelize.STRING(255)
    },
    need_reviewed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    type: {
        type: Sequelize.STRING(32),

    },
    is_grouped: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
}, { sequelize, tableName: 'plan' });

Plan.belongsTo(User, { as: 'Creator', foreignKey: 'created_user_id', allowNull: false });
User.hasMany(Plan, { as: "CreatedPlan", foreignKey: "created_user_id", });

Plan.belongsToMany(User, { as: "Participants", through: "PlanParticipantsStatus", foreignKey: "joined_plan_id" });
User.belongsToMany(Plan, { as: "JoinedPlan", through: "PlanParticipantsStatus", foreignKey: "participant_id" });
PlanParticipantsStatus.belongsTo(User, { foreignKey: 'participant_id' });

const PlanTypes = sequelize.define("PlanTypes", {
    plan_type_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    typeName: {
        type: Sequelize.STRING(length = 32),
        allowNull: false
    }
}, { sequelize, tableName: 'PlanTypes' });

Plan.belongsToMany(PlanTypes, { foreignKey: "plan_id", through: PlanTypeAssociation });
PlanTypes.belongsToMany(Plan, { foreignKey: "plan_type_id", through: PlanTypeAssociation });

const Discussion = sequelize.define("Discussion", {
    discussion_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: Sequelize.STRING,
    },
},
    {
        // Sequelize options
        tableName: 'PlanDiscussion', // Explicitly specifying the table name here
        timestamps: false // assuming your table does not have fields like createdAt or updatedAt
    },
);

Discussion.belongsTo(User, { as: "Sender", foreignKey: "sender_id", allowNull: false });
User.hasMany(Discussion, { as: "PlanDiscussions", foreignKey: "sender_id" });

Discussion.belongsTo(Plan, { as: "Plan", foreignKey: "plan_id", allowNull: false });
Plan.hasMany(Discussion, { as: "Discussions", foreignKey: "plan_id" });

const Applications = sequelize.define("Applications", {
    application_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    application_response: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    is_approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
},
    {
        // Sequelize options
        tableName: 'PlanApplication', // Explicitly specifying the table name here
        timestamps: false // assuming your table does not have fields like createdAt or updatedAt
    },
);

// define relationship
Applications.belongsTo(User, { as: "Applicant", foreignKey: "applicant_id", allowNull: false });
User.hasMany(Applications, { as: "PlanApplications", foreignKey: "applicant_id" });

Applications.belongsTo(Plan, { as: "Plan", foreignKey: "plan_id", allowNull: false });
Plan.hasMany(Applications, { as: "Applications", foreignKey: "plan_id" });


const Invitations = sequelize.define("PlanInvitations", {
    "invitation_id": {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "accepted": {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
},
    {
        tablaName: "PlanInvitations",
        timestamps: false,
    }
);

Invitations.belongsTo(Plan, { foreignKey: "plan_id", allowNull: false });
Plan.hasMany(Invitations, { foreignKey: "plan_id" });

Invitations.belongsTo(User, { as: "Invitee", foreignKey: "invitee", allowNull: false });
User.hasMany(Invitations, { as: "PlanInvitations", foreignKey: "invitee" });


module.exports = {
    Plan, PlanTypes, PlanTypeAssociation,
    Invitations, Discussion, PlanParticipantsStatus, PlanTypeAssociation, Applications
};







