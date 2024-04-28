const { serializeUser } = require('passport');
const { sequelize, Sequelize } = require('../../database');
const User = require('./userModel');
const { DataTypes } = require('sequelize');



const ActivityParticipantStatus = sequelize.define('ActivityParticipantStatus');
const ActivityTag = sequelize.define('ActivityTag');
/* =========================== Activities Table =================================== */

/**
 * TABLE: Activities
 */
const Activities = sequelize.define('Activity', {
    activity_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    introduction: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    date: {
        type: Sequelize.DATE,
    },
    country: {
        type: Sequelize.STRING,
    },
    location: {
        type: Sequelize.STRING,
    },
    max_participants: {
        type: Sequelize.INTEGER,
    },
    need_reviewed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    is_one_time: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    application_problem: {
        type: Sequelize.STRING,
    },
    check_by_organizer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },

    // FOREIGN KEY(created_user_id) REFERENCES Users(user_id);

},
    {
        // Sequelize options
        tableName: 'Activities', // Explicitly specifying the table name here
        timestamps: false // assuming your table does not have fields like createdAt or updatedAt
    },
);

Activities.belongsTo(User, { as: "Creator", foreignKey: "created_user_id", allowNull: false });
User.hasMany(Activities, { as: "CreatedActivities", foreignKey: "created_user_id" });

Activities.belongsToMany(User, { as: "Participants", through: "ActivityParticipantStatus", foreignKey: "joined_activities" });
User.belongsToMany(Activities, { as: "JoinedActivities", through: "ActivityParticipantStatus", foreignKey: "participants" });

/**
 * TABLE: LongTermActivities
 */
const LongTermActivities = sequelize.define("LongTermActivities", {
    long_term_activity_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true,
    },
    activity_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "Activities",
            key: "activity_id",
        }
    },
    date: {
        type: Sequelize.DATE,
    },
    last_activity_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "Activities",
            key: "activity_id",
        },
    },

},
    {
        // Sequelize options
        tableName: 'LongTermActivities', // Explicitly specifying the table name here
        timestamps: false // assuming your table does not have fields like createdAt or updatedAt
    },
);

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
        tableName: 'Applications', // Explicitly specifying the table name here
        timestamps: false // assuming your table does not have fields like createdAt or updatedAt
    },
);

// define relationship
Applications.belongsTo(User, { as: "Applicant", foreignKey: "applicant_id", allowNull: false });
User.hasMany(Applications, { as: "Applications", foreignKey: "applicant_id" });

Applications.belongsTo(Activities, { as: "Activity", foreignKey: "activity_id", allowNull: false });
Activities.hasMany(Applications, { as: "Applications", foreignKey: "activity_id" });


const Invitation = sequelize.define("Invitation", {
    invitation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    inviter_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "Users",
            key: "user_id",
        },
    },
    invitee_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "Users",
            key: "user_id",
        },
    },
    activity_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "Activities",
            key: "activity_id",
        }
    }
},
    {
        // Sequelize options
        tableName: 'Invitation', // Explicitly specifying the table name here
        timestamps: false // assuming your table does not have fields like createdAt or updatedAt
    },
);

// define relationship
Invitation.belongsTo(User, { as: "Inviter", foreignKey: "inviter_id", allowNull: false });
User.hasMany(Invitation, { as: "Inviting", foreignKey: "inviter_id" });

Invitation.belongsTo(User, { as: "Invitee", foreignKey: "invitee_id", allowNull: false });
User.hasMany(Invitation, { as: "Invited", foreignKey: "invitee_id" });

Invitation.belongsTo(Activities, { as: "Activity", foreignKey: "activity_id", allowNull: false });
Activities.hasMany(Invitation, { as: "Invitations", foreignKey: "activity_id" });

const Tag = sequelize.define("Tag", {
    name: {
        type: Sequelize.STRING,
    },
},
    {
        // Sequelize options
        tableName: 'Tag', // Explicitly specifying the table name here
        timestamps: false // assuming your table does not have fields like createdAt or updatedAt
    },
);

Tag.belongsToMany(Activities, { as: "Activities", through: "ActvityTag", foreignKey: "tag" });
Activities.belongsToMany(Tag, { as: "Tags", through: "ActvityTag", foreignKey: "activities" });

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
        tableName: 'Discussion', // Explicitly specifying the table name here
        timestamps: false // assuming your table does not have fields like createdAt or updatedAt
    },
);

Discussion.belongsTo(User, { as: "Sender", foreignKey: "sender_id", allowNull: false });
User.hasMany(Discussion, { as: "Discussion", foreignKey: "sender_id" });

Discussion.belongsTo(Activities, { as: "Activity", foreignKey: "activity_id", allowNull: false });
Activities.hasMany(Discussion, { as: "Discussions", foreignKey: "activity_id" });



module.exports = { Activities, LongTermActivities, Applications, Invitation, Tag, Discussion, ActivityParticipantStatus, ActivityTag, };