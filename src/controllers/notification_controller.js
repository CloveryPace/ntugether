const { Op, where } = require('sequelize');

const planModel = require('../model/planModel');
const activityModel = require('../model/activityModel');
const User = require('../model/userModel');

allow_types = ["activity", "plan"];
allow_contents = ["invitation", "application"];

async function getPlanInvitations(invitee_id) {
    invitations = await planModel.Invitations.findAll({
        include: {
            model: planModel.Plan,
        },
        where: {
            "invitee": invitee_id,
        }
    });

    return invitations;
}

async function getActivityInvitations(invitee_id) {
    invitations = await activityModel.Invitation.findAll({
        include: {
            model: activityModel.Activities,
            as: "Activity",
        },
        where: {
            "invitee_id": invitee_id,
        }
    });

    return invitations;
}


async function getActivityApplications(user_id) {
    applications = await activityModel.Applications.findAll({
        include: {
            model: activityModel.Activities,
            as: "Activity",
            where: {
                created_user_id: user_id,
            },
            attributes: ["activity_id", "name", "application_problem"],
        }
    });

    return applications;
}


async function getPlanApplications(user_id) {
    applications = await planModel.Applications.findAll({
        include: {
            model: planModel.Plan,
            as: "Plan",
            where: {
                created_user_id: user_id,
            },
            attributes: ["plan_id", "name", "application_problem"],
        }
    });

    return applications;
}

/**
 * get all the notifications for user
 * 1. invitation for plan
 * 2. invitation for activity
 * 3. application for plan
 * 4. application for activty
 * 
 * parameters:
 * 1. types: List(seperated by camma), options: ["activity", "plan"]
 * 2. contents: List(seperated by camma), options: ["invitation", "application"]
 * 3, limit
 * 4. offset
 */
exports.getNotifications = async (req, res) => {
    try {
        const user_id = req.user_id;
        var types = ["activity", "plan"];
        var contents = ["invitation", "application"];

        try {
            types = req.query.types ? req.query.types.split(",") : types;
            console.log("type is ", types);

        } catch (error) {
            console.log("error getting types", error);
            return res.status(400).json({ error: `${error}: invalid types format, should be types=<type1>,<type2>` });
        }

        try {
            contents = req.query.contents ? req.query.contents.split(",") : contents;
            console.log("contents is ", contents);
        } catch (error) {
            console.log("error getting contents", error);
            return res.status(400).json({ error: `${error}: invalid contents format, should be contents=<type1>,<type2>` });
        }

        for (var i = 0; i < types.length; i++) {
            if (!allow_types.includes(types[i])) return res.status(400).json({ error: `type ${types[i]} is not allowed` });
        }
        for (var i = 0; i < contents.length; i++) {
            if (!allow_contents.includes(contents[i])) return res.status(400).json({ error: `type ${contents[i]} is not allowed` });
        }


        var retNotifications = {};

        if (contents.includes("invitation")) {
            retNotifications.invitation = {};

            if (types.includes("plan"))
                retNotifications.invitation.plan = await getPlanInvitations(user_id);
            if (types.includes("activity"))
                retNotifications.invitation.activity = await getActivityInvitations(user_id); // TODO: implement getActivityInvitation later
        }

        if (contents.includes("application")) {
            retNotifications.application = {};
            if (types.includes("plan"))
                retNotifications.application.plan = await getPlanApplications(user_id);
            if (types.includes("activity"))
                retNotifications.application.activity = await getActivityApplications(user_id);
        }

        res.status(200).json(retNotifications);


    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({ error: error.message });
    }
};