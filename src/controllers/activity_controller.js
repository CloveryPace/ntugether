const { Op } = require('sequelize');
const activityModel = require('../model/activityModel');
const User = require('../model/userModel');
const { parse } = require('yamljs');
User.sync();


/**
 * The function would format an activity instance with more detail, including the creator and participants related data
 * @param {*} activity_id 
 * @returns activity instance including creator and particpants data 
 * 
 * TODO: maybe directly add include the user data to an instance passed of, instead of doing query again
 */
async function returnActivity(activity_id) {
    var activity = await activityModel.Activities.findByPk(activity_id, {
        include: [
            {
                model: User,
                as: 'Creator',
            },
            {
                model: User,
                as: 'Participants',
            }
        ],
    });

    console.log("returning activity");

    return activity;
};

/**
 * sync all the model used in the controller 
 */
exports.sync = async () => {
    await activityModel.Activities.sync({ alter: false });
    await activityModel.ActivityParticipantStatus.sync({ alter: false });
    await activityModel.ActivityTag.sync({ alter: false });
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
        const is_long_term = req.query.is_long_term || false;
        const mode = req.query.mode || "all";

        allowModes = ["owned", "joined", "all"];

        if (allowModes.includes(mode) == false) return res.status(400).send("invalid mode");

        // set search condition
        var condition = {
            is_one_time: !is_long_term,
        };

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
        var includeConditions = new Array();
        if (mode == "owned") includeConditions.push({
            model: User,
            as: 'Creator'
        });
        else if (mode == "joined") includeConditions.push({
            model: User,
            as: 'Participants',
            where: {
                user_id: user_id,
            }
        });

        const activities = await activityModel.Activities.findAll({
            include: includeConditions,
            where: condition,
            limit: limit,
            offset: offset,
        });

        res.status(200).json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Create activity from request data
 * @param {*} req 
 * @param {*} res 
 */
exports.createActivity = async (req, res) => {
    /*
    Exampe request format
    {
        "id": 10,
        "name": "example Activity",
        "introduction": "Introduction of Activity",
        "date": "2024-04-27T04:56:30.276Z",
        "need_review": true,
        "country": "string",
        "max_participants": 0,
        "location": "string",
        "application_problem": "string",
    };
    */

    try {
        const user_id = req.user_id;

        var { id, ...body } = req.body;
        // body.need_review = req.body.need_review;
        // body.is_one_time = req.body.is_one_time;
        // body.check_by_organizer = req.body.check_by_organizer;
        body.created_user_id = user_id;

        const newActivity = await activityModel.Activities.create(body);
        res.status(201).send("Successfully create an Activity");
    }
    catch (error) {
        console.error("Error creating activity", error);
        res.status(500).json({ error: "Internal server error" });
    }

};

/**
 * get the detail of activity given activity_id in req.params
 * @param {*} req 
 * @param {*} res 
 * }
 */
exports.getActivityDetail = async (req, res) => {

    /* NOTE: response format
    {
        "id": 10,
        "name": "example Activity",
        "introduction": "Introduction of Activity",
        "date": "2024-04-27T05:48:47.139Z",
        "created_user": {
            "id": 10,
            "username": "theUser",
            "email": "john@email.com",
            "user_photo": "https://s3.ntugether.com/photos/1.pdf"
        },
        "need_review": true,
        "county": "string",
        "location": "string",
        "max_participants": 0,
        "application_problem": "string",
        "joined_users": [
            {
                "id": 10,
                "username": "theUser",
                "email": "john@email.com",
                "user_photo": "https://s3.ntugether.com/photos/1.pdf"
            }
        ]
    };
    */

    try {
        const user_id = req.user_id;

        const activity_id = req.params.activity_id;
        console.log("here");
        var activity = await activityModel.Activities.findByPk(activity_id);
        console.log("get ac");
        if (activity == null) return res.status(400).send("no activity");
        activity = await returnActivity(activity_id);
        res.status(200).json(activity);
    } catch (error) {
        console.error("Error getting activity detail", error);
        res.status(500).json({ error: "Internal server error" });
    }

};

/**
 * Update an existing activity by Id. Only the creator of the activity could call this endpoint.
 * The activity_id should be defined in the url parameter
 * @param {*} req 
 * @param {*} res 
 */
exports.updateActivity = async (req, res) => {
    /* NOTE: request format
    {
        "id": 10,
        "name": "example Activity",
        "introduction": "Introduction of Activity",
        "date": "2024-04-27T06:26:48.578Z",
        "need_review": true,
        "county": "string",
        "max_participants": 0,
        "location": "string",
        "application_problem": "string"
    }
    */

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
        res.status(200).json(updatedActivity);
    } catch (error) {
        // If any error occurs, handle it and send a 500 error response
        console.error('Error updating activity:', error);
        res.status(500).json({ error: 'Internal server error' });
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
        var activity = await activity_id.Activities.findByPk(activity_id);

        // If activity not found, return 404 error
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        // check if the user is the creator of the activity
        // NOTE: move to middleware?
        if (activity.created_user_id != user_id) {
            return res.status(403).json({ error: 'You are not authorized to delete this activity' });
        }
        await activity.destroy();

        res.status(204).send("sucessfully delete");
    } catch (error) {
        // If any error occurs, handle it and send a 500 error response
        console.error('Error deleting activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get all application for the specific activity. Only the creator of the activity could call this endpoint.
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllApplications = async (req, res) => {
    /*
    NOTE: response format
    [
        {
            "id": 1,
            "applicant": {
            "id": 10,
            "username": "theUser",
            "email": "john@email.com",
            "user_photo": "https://s3.ntugether.com/photos/1.pdf"
            },
            "activity_id": 1,
            "is_approved": false,
            "application_response": "This is a response for the applicant"
        }
    ]
    */

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
            where: {
                activity_id: activity_id
            }
        });

        res.json(applications);
    } catch (error) {
        // If any error occurs, handle it and send a 500 error response
        console.error('Error getting all applications:', error);
        res.status(500).json({ error: 'Internal server error' });
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

        if (!activity) return res.status(400).send("Activity not found");
        if (activity.created_user_id != user_id) return res.status(403).send("authorization failed");

        const remove_user_ids = req.body.user_id; // array
        for (const remove_id of remove_user_ids) {

            participant = await activityModel.ActivityParticipantStatus.findOne(
                {
                    where: {
                        joined_activities: activity_id,
                        participants: remove_id
                    }
                }
            );
            if (participant) participant.destroy();
        }

        res.status(200).send("users removed");

    } catch (error) {
        console.error('Error removing participants:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * join specific activity, except the user has joined it already
 * @param {*} req 
 * @param {*} res 
 */
exports.applyActivity = async (req, res) => {
    /* NOTE: request body
    {
        "application_response": "string"
    }
    */

    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;
        const activity = activityModel.Activities.findByPk(activity_id);


        if (!activity) return res.status(400).send("Activity not found");

        if (
            !activityModel.ActivityParticipantStatus.findOne({
                where: {
                    joined_activities: activity_id,
                    participants: user_id
                }
            })
        ) return res.status(403).send("participant existed");

        const application_response = req.body.application_response; // TODO: need to check if the paramter exists

        activityModel.Applications.create(
            {
                application_response: application_response,
                applicant_id: user_id,
                activity_id: activity_id,
            }
        );

        res.status(201).send("Successfully send the application");
    } catch (error) {
        console.error('Error applying for activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.leaveActivity = async (req, res) => { }; // NOTE: not specified yet

/**
 * get all discussion based on the order of timeline of specific activity, where the output is also controlled by offset and limit
 * @param {*} req 
 * @param {*} res 
 */
exports.getDiscussion = async (req, res) => {
    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        // validation
        const activity = activityModel.Activities.findByPk(activity_id);
        if (!activity) return res.status(400).send("Activity not found");

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

        res.status(200).json(discussions);
    } catch (error) {
        console.error('Error getting discussion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.makeDiscussion = (req, res) => {
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
        const activity = activityModel.Activities.findByPk(activity_id);
        if (!activity) return res.status(400).send("Activity not found");

        var isParicipant = activityModel.ActivityParticipantStatus.findOne({
            where: {
                joined_activities: activity_id,
                participants: user_id
            }
        });
        if (activity.created_user_id != user_id && !isParicipant) return res.status(403).send("authorization failed");

        const discussion = activityModel.Discussion.create(
            {
                sender_id: user_id,
                activity_id: activity_id,
                content: content,
            }
        );

        res.status(201).send("discussion made");

    } catch (error) {
        console.error('Error making discussion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};