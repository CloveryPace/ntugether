const { Op, ValidationError } = require('sequelize');
const activityModel = require('../model/activityModel');
const User = require('../model/userModel');
User.sync();

const allowTags = ["exercise", "study"];

/**
 * The function would format an activity instance with more detail, including the creator and participants related data
 * @param {*} activity_id 
 * @returns activity instance including creator and particpants data 
 * 
 * TODO: maybe directly add include the user data to an instance passed of, instead of doing query again
 */
async function returnActivity(activity_id) {
    var includeModels = [
        {
            model: User,
            as: 'Creator',
            attributes: ["user_id", "name", "email", "phoneNum", "photo", "gender"]
        },
        {
            model: User,
            as: 'Participants',
            attributes: ["user_id", "name", "photo", "gender"],
            through: {
                attributes: [],
            }
        },
    ];

    var activity = await activityModel.Activities.findByPk(activity_id, { include: includeModels });

    if (!activity) {
        console.log(`activity with id ${activity_id} not found`);
        return null;
    }

    var activityJson = activity.toJSON();

    if (!activity.is_one_time) {
        activityJson.date = [];
        longTermInstances = await activityModel.LongTermActivities.findAll(
            {
                where: {
                    activity_id: activity.activity_id
                }
            }
        );

        longTermInstances.forEach(e => {
            activityJson.date.push(e.date);
        });

    }

    return activityJson;
};

/**
 * Add user to the application list of an activity
 * @param {*} req 
 * @param {*} res 
 * @param {*} activity_id 
 * @param {*} user_id 
 * @param {*} application_response 
 * @returns 
 */
async function needReviewApply(req, res, activity_id, user_id, application_response) {
    participantsExist = await activityModel.ActivityParticipantStatus.findOne({
        where: {
            joined_activities: activity_id,
            participants: user_id,
        }
    });

    if (participantsExist) return res.status(400).send("applier has already joined");

    const applicantExist = await activityModel.Applications.findOne({
        where: {
            applicant_id: user_id,
            activity_id: activity_id
        }
    });

    if (applicantExist) return res.status(409).send("Applicant already exist.");

    // const application_response = req.body.application_response; // TODO: need to check if the paramter exists
    if (application_response !== undefined) {
        activityModel.Applications.create(
            {
                application_response: application_response,
                applicant_id: user_id,
                activity_id: activity_id,
            }
        );
    }
    return res.status(201).send("Successfully send the application");
}

/**
 * Directly include the user to the participants of the activity
 * @param {*} req 
 * @param {*} res 
 * @param {*} activity_id 
 * @param {*} user_id 
 * @returns 
 */
async function noReviewApply(req, res, activity_id, user_id) {
    participantsExist = await activityModel.ActivityParticipantStatus.findOne({
        where: {
            joined_activities: activity_id,
            participants: user_id,
        }
    });

    if (participantsExist) return res.status(400).send("applier has already joined");
    const user = await User.findOne({
        where: { user_id: user_id }

    });

    // update participants
    const participantStatus = await activityModel.ActivityParticipantStatus.create(
        {
            joined_activities: activity_id,
            participants: user_id
        }
    );
    return res.status(200).send("joined!");

}

/**
 * Add invitation to a activity
 * @param {*} invitees A list of user_id of the users being invited
 * @param {*} activity_id The id of the activity
 * @returns 
 */
async function addInvitee(invitees, activity_id) {
    // TODO: respond with 400 if trying to invite creator

    for (let inv_id of invitees) {
        inv_id = parseInt(inv_id);
        var inv = await User.findByPk(inv_id);
        if (!inv) {
            throw new ValidationError(`invitee not found ${inv_id}`);
        }

        await activityModel.Invitation.findOne({
            where: {
                activity_id: activity_id,
                invitee_id: inv_id
            }
        }).then((invitation) => {
            if (invitation) {
                throw new ValidationError("invitation existed");
            }
        });

        await activityModel.Invitation.create(
            {
                activity_id: activity_id,
                invitee_id: inv_id,
            }
        );
    }
}

/**
 * sync all the model used in the controller 
 */
exports.sync = async () => {
    await activityModel.Activities.sync({ alter: true });
    await activityModel.ActivityParticipantStatus.sync({ alter: true });
    await activityModel.LongTermActivities.sync({ alter: true });
    await activityModel.Applications.sync({ alter: false });
    await activityModel.Invitation.sync({ alter: false });
    await activityModel.Discussion.sync({ alter: false });
};

/**
 * get all activity as a list
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getActivitiesList = async (req, res) => {
    try {
        const user_id = req.user_id;

        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;
        const start_date = req.query.start_date;
        const end_date = req.query.end_date;
        const search = req.query.search;
        const country = req.query.country;
        const location = req.query.location;
        const is_long_term = req.query.is_long_term;
        const mode = req.query.mode || "all";

        allowModes = ["owned", "joined", "all"];

        if (allowModes.includes(mode) == false) return res.status(400).send("invalid mode");

        // set search condition
        var condition = {};

        if (is_long_term != null) condition.is_one_time = !(is_long_term == "true" || is_long_term == "True");
        if (country) condition.country = country;
        if (location) condition.location = location;
        if (search) condition.name = { [Op.like]: '%' + search + '%' };
        if (start_date & end_date) {
            condition.date = {
                [Op.between]: [start_date, end_date]
            };
        } else if (start_date) {
            condition.date = {
                [Op.gt]: [start_date]
            };
        } else if (end_date) {
            condition.date = {
                [Op.lt]: [end_date]
            };
        }

        // set include condition
        var includeConditions = new Array;
        if (mode == "owned") includeConditions.push({
            model: User,
            as: 'Creator',
            where: {
                user_id: user_id,
            }
        });
        else if (mode == "joined") includeConditions.push({
            model: User,
            as: 'Participants',
            where: {
                user_id: user_id,
            }
        });

        const activities = await activityModel.Activities.findAll({
            include: [
                {
                    model: User,
                    as: 'Creator',
                    attributes: ["user_id", "name", "email", "phoneNum", "photo", "gender"],
                    where: mode == "owned" ? { user_id: user_id } : null,
                },
                {
                    model: User,
                    as: 'Participants',
                    attributes: ["user_id", "name", "photo", "gender"],
                    through: {
                        attributes: [],
                    },
                    where: mode == "joined" ? { user_id: user_id } : null,

                },
            ],
            where: condition,
            limit: limit,
            offset: offset,
        });

        parsedActivities = [];

        for (var i = 0; i < activities.length; i++) {
            activity = activities[i];
            let activityJson = activity.toJSON();

            if (!activity.is_one_time) {
                activityJson.date = [];
                longTermInstances = await activityModel.LongTermActivities.findAll(
                    {
                        where: {
                            activity_id: activity.activity_id
                        }
                    }
                );

                longTermInstances.forEach(e => {
                    activityJson.date.push(e.date);
                });

            }

            if (activityJson) parsedActivities.push(activityJson);

        }

        res.status(200).json(parsedActivities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Create activity from request data
 * @param {*} req 
 * @param {*} res 
 */
exports.createActivity = async (req, res) => {

    var newActivity = null;
    try {
        const user_id = req.user_id;
        const { id, ...body } = req.body;

        console.log("body is", res.body);
        var dates = null;

        // get date list and make date field a single element
        body.created_user_id = user_id;

        // process long term date
        if (!body.is_one_time) {
            console.log("IS LONG TERM");
            console.log("body.date is ", body.date);
            dates = body.date;
            body.date = dates[0];
        }

        const newActivity = await activityModel.Activities.create(body);
        const user = await User.findOne({ where: { user_id: user_id } });
        // console.log(newActivity);

        // create long term activity
        if (!body.is_one_time) {
            console.log("is long term activity");
            for (var i = 0; i < dates.length; i++) {
                console.log("date is", dates[i]);
                await activityModel.LongTermActivities.create(
                    {
                        activity_id: newActivity.activity_id,
                        date: dates[i],
                    }
                );
            }
        }

        // update participants
        await activityModel.ActivityParticipantStatus.create(
            {
                joined_activities: newActivity.activity_id,
                participants: user_id,
            }
        );

        res.status(201).json({ message: "Successfully create an Activity", activity_id: newActivity.activity_id });
    }
    catch (error) {
        if (newActivity) newActivity.destroy();
        console.error("Error creating activity", error.message);
        res.status(500).json({ error: error.message });
    }

};

/**
 * get the detail of activity given activity_id in req.params
 * @param {*} req 
 * @param {*} res 
 * }
 */
exports.getActivityDetail = async (req, res) => {


    try {
        const user_id = req.user_id;

        const activity_id = req.params.activity_id;
        var activity = await activityModel.Activities.findByPk(activity_id);
        if (activity == null) return res.status(404).send("Activity not found");

        activity = await returnActivity(activity_id);
        return res.status(200).json(activity);
    } catch (error) {
        console.error("Error getting activity detail", error);
        return res.status(500).json({ error: error.message });
    }

};

/**
 * Update an existing activity by Id. Only the creator of the activity could call this endpoint.
 * The activity_id should be defined in the url parameter
 * @param {*} req 
 * @param {*} res 
 */
exports.updateActivity = async (req, res) => {

    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;

        // Find the activity by ID
        var activity = await activityModel.Activities.findByPk(activity_id);

        // If activity not found, return 404 error
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        // check if the user is the creator of the activity
        // NOTE: move to middleware?
        if (activity.created_user_id != user_id) {
            return res.status(403).json({ error: 'You are not authorized to update this activity' });
        }

        const { ...updateParams } = req.body; // NOTE: might use ...updateParams to separate update data and others
        await activity.update(updateParams);
        var updatedActivity = await returnActivity(activity_id);

        return res.status(200).json(updatedActivity);
    } catch (error) {
        // If any error occurs, handle it and send a 500 error response
        console.error('Error updating activity:', error);
        res.status(500).json({ error: error.message });
    }

};

/**
 * Delete the activity. Only the creator of the activity could call this endpoint
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteActivity = async (req, res) => {

    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;

        // Find the activity by ID
        var activity = await activityModel.Activities.findByPk(activity_id);

        // If activity not found, return 404 error
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        // check if the user is the creator of the activity
        // NOTE: move to middleware?
        if (activity.created_user_id != user_id) {
            return res.status(403).json({ error: 'You are not authorized to delete this activity' });
        }
        const deleteRows = await activityModel.Activities.destroy({ where: { activity_id } });
        if (deleteRows > 0) {
            return res.status(200).json({ message: "sucessfully delete" });
        }


    } catch (error) {
        // If any error occurs, handle it and send a 500 error response
        console.error('Error deleting activity:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get all application for the specific activity. Only the creator of the activity could call this endpoint.
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllApplications = async (req, res) => {

    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;
        const activity = await activityModel.Activities.findByPk(activity_id);

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        if (activity.created_user_id != user_id) {
            return res.status(403).json({ error: 'not activity creator' });
        }

        const applications = await activityModel.Applications.findAll({
            include: [
                {
                    model: User,
                    as: "Applicant",
                    attributes: ["user_id", "name", "photo", "gender"],
                },
                {
                    model: activityModel.Activities,
                    as: "Activity",
                    attributes: ['activity_id', 'name'],
                }
            ],
            where: {
                activity_id: activity_id,
                is_approved: false
            }
        });
        // if (applications.length === 0) {
        //     return res.status(404).json({ error: 'no application found' });
        // }

        return res.json(applications);
    } catch (error) {
        // If any error occurs, handle it and send a 500 error response
        console.error('Error getting all applications:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllParticipants = async (req, res) => {

    try {
        // const user_id = req.user_id;

        const activity_id = req.params.activity_id;
        var activity = await activityModel.Activities.findByPk(activity_id);
        if (activity == null) return res.status(404).send("Activity not found.");

        const participants = await activityModel.ActivityParticipantStatus.findAll({
            where: {
                joined_activities: activity_id
            },
            include: [{
                model: User,
                attributes: ['name']
            }]

        });
        return res.status(200).json(participants);

    } catch (error) {
        console.error("Error getting participants list.", error);
        res.status(500).json({ error: error.message });
    }

};

/**
 * remove the join user for specific activity, only activity creator can do this
 * @param {*} req 
 * @param {*} res 
 */
exports.removeUser = async (req, res) => {
    /* NOTE: request body
    {
        "user_id": [0]
    }
    */

    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;
        const activity = await activityModel.Activities.findByPk(activity_id);

        if (!activity) return res.status(404).send("Activity not found");
        if (activity.created_user_id != user_id) return res.status(403).send("authorization failed");

        // const remove_user_ids = req.body.user_id; // array
        const remove_id = req.body.remove_user_id;
        // for (const remove_id of remove_user_ids) {

        participant = await activityModel.ActivityParticipantStatus.findOne(
            {
                where: {
                    joined_activities: activity_id,
                    participants: remove_id
                }
            }
        );
        if (participant) {
            participant.destroy();
            res.status(204).send("user removed");
        } else {
            res.status(404).send("Participants not found.");
        }
        // }

        // res.status(200).send("users removed");

    } catch (error) {
        console.error('Error removing participants:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * join specific activity, except the user has joined it already
 * @param {*} req 
 * @param {*} res 
 */
exports.applyActivity = async (req, res) => {


    const { application_response } = req.body;
    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;

        const activity = await activityModel.Activities.findByPk(activity_id);
        if (!activity) return res.status(404).send("Activity not found");
        if (activity.created_user_id === user_id) return res.status(403).send("Activity creator should not applied.");

        const activityNeedReview = await activityModel.Activities.findOne({
            where: {
                need_reviewed: true,
                activity_id: activity_id
            }
        });

        if (activityNeedReview) return needReviewApply(req, res, activity_id, user_id, application_response);

        return noReviewApply(req, res, activity_id, user_id); //add , participant_name
    } catch (error) {
        console.error('Error applying for activity:', error);
        res.status(500).json({ error: error.message });
    }
};

// exports.joinActivity = async (req, res) => {

// };

exports.leaveActivity = async (req, res) => {
    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;

        const activity = await activityModel.Activities.findByPk(activity_id);

        if (!activity) return res.status(404).send("Activity not found");

        const participantStatus = await activityModel.ActivityParticipantStatus.findOne(
            {
                where: {
                    joined_activities: activity_id,
                    participants: user_id,
                }
            },
        );

        if (!participantStatus) {
            return res.status(401).json({ error: "you are not in the activity" });
        }

        await participantStatus.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error applying for activity:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * get all discussion based on the order of timeline of specific activity, where the output is also controlled by offset and limit
 * @param {*} req 
 * @param {*} res 
 */
exports.getDiscussion = async (req, res) => {
    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        // validation
        const activity = await activityModel.Activities.findByPk(activity_id);
        if (!activity) return res.status(404).send("Activity not found");

        const discussions = await activityModel.Discussion.findAll({
            include: [
                {
                    model: User,
                    as: "Sender",
                },
                {
                    model: activityModel.Activities,
                    as: "Activity",
                    where: {
                        activity_id: activity_id,
                    }
                },
            ],
            limit: limit,
            offset: offset,
        });

        return res.status(200).json(discussions);
    } catch (error) {
        console.error('Error getting discussion:', error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.makeDiscussion = async (req, res) => {
    /* NOTE: request body
    {
        "content": "string"
    }
    */

    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;
        const content = req.body.content;

        // validation
        const activity = await activityModel.Activities.findByPk(activity_id);
        if (!activity) {
            return res.status(404).send("Activity not found");
        }


        var isParicipant = await activityModel.ActivityParticipantStatus.findOne({
            where: {
                joined_activities: activity_id,
                participants: user_id
            }
        });

        if (!isParicipant) {   // 只要是參加者都可以留言
            return res.status(403).send("User hasn't joined the activity");
        }

        const user = await User.findOne({
            where: { user_id: user_id }

        });

        const discussion = activityModel.Discussion.create(
            {
                sender_id: user_id,
                sender_name: user.name,
                activity_id: activity_id,
                content: content,
            }
        );

        return res.status(201).send("discussion made");

    } catch (error) {
        console.error('Error making discussion:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.invite = async (req, res) => {
    /**
     * url: hostanme/activity/12345/invite
     * method: POST
     * Input format
     * ```
     * {
     *  "invitees": [1, 3, 5]
     * }
     * ```
     */

    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;
        const invitees = req.body.invitees;
        console.log("invitees", typeof invitees);

        const activity = await activityModel.Activities.findByPk(activity_id);

        if (!activity) return res.status(404).send("Activity not found");
        if (activity.created_user_id != user_id) return res.status(403).send("authorization failed");

        await addInvitee(invitees, activity_id);
        res.status(200).json({ message: "invitations created" });

    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Validation error occurs', error);
            return res.status(400).json({ error: error.message });
        }

        console.error('Error making invitations:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Accept/Decline Invitation for joining activity
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.respondToInvitation = async (req, res) => {
    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;
        const accepted = req.body.accepted;

        // Todo: Can selected from followers
        invitation = await activityModel.Invitation.findOne({
            where: {
                "activity_id": activity_id,
                "invitee_id": user_id,
            }
        });

        if (!invitation) return res.status(400).json({ message: "not invited" });

        await activityModel.Activities.findByPk(activity_id).then(
            (activity) => {
                if (!activity) return res.status(404).json({ message: "activity not found" });
            }
        );

        // join the activity
        await activityModel.ActivityParticipantStatus.findOne({
            where: {
                joined_activities: activity_id,
                participants: user_id,
            }
        }).then((activityParti) => {
            if (activityParti) return res.status(400).json({ message: "already in the activity" });
        });

        if (accepted)
            await activityModel.ActivityParticipantStatus.create({
                joined_activities: activity_id,
                participants: user_id,
            });

        await invitation.destroy();

        res.status(200).json({ message: "response sent" });
    } catch (error) {
        console.error('Error making invitations:', error);
        res.status(500).json({ error: error.message });
    }
};

