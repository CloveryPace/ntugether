const express = require('express');
const { Op } = require('sequelize');
const activityModel = require('../model/activityModel');
const User = require('../model/userModel');

/**
 * get application detail with application id, only the corresponding activity creator could call this endpoint
 * @param {*} req 
 * @param {*} res 
 */
exports.getApplicationDetail = async (req, res) => {
    /* NOTE: repsonse format
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
    */

    try {
        const user_id = req.user_id;
        const application_id = req.params.application_id;
        const application = await activityModel.Applications.findByPk(application_id, {
            include: [
                {
                    model: User,
                    as: "Applicant",
                },
                {
                    model: activityModel.Activities,
                    as: "Activity",
                    attributes: ['activity_id'],
                }
            ]
        });

        // validation
        const activity_id = application.activity_id;
        const activity = await activityModel.Activities.findByPk(activity_id);
        if (activity.created_user_id != user_id) return res.status(403).send("authorization failed");
        if (!application) return res.status(400).send("application not found");

        res.status(200).json(application);
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * verify for applications. Only the creator of the activity could call the endpoint
 * @param {*} req 
 * @param {*} res 
 */
exports.approve = async (req, res) => {
    try {
        const user_id = req.user_id;
        const application_id = req.params.application_id;
        const application = await activityModel.Applications.findByPk(application_id);

        // validation
        if (!application) return res.status(400).send("application not found");
        if (application.is_approved == true) return res.status(400).send("application has been approved");

        // get activity
        const activity_id = application.activity_id;
        const activity = await activityModel.Activities.findByPk(activity_id);

        if (!activity) return res.status(400).send("activity not found");
        if (activity.created_user_id != user_id) return res.status(403).send("authorization failed");

        // get applicant
        const applicant_id = application.applicant_id;

        participantsExist = await activityModel.ActivityParticipantStatus.findOne({
            where: {
                joined_activities: activity_id,
                participants: applicant_id,
            }
        });
        console.log("participantsExist", participantsExist);

        if (participantsExist) return res.status(400).send("participant has already joined");

        // update is_approves
        application.update(
            {
                is_approved: true,
            }
        );

        // update participants
        const join = await activityModel.ActivityParticipantStatus.create(
            {
                joined_activities: activity_id,
                participants: applicant_id
            }
        );
        console.log("join", join);
        res.status(200).send("approved!");

    } catch (error) {
        console.error('Error approving application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};