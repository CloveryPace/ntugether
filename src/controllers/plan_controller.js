const { ValidationError, Op } = require("sequelize");
const planModel = require("../model/planModel");
const User = require("../model/userModel");
const { joinSQLFragments } = require("sequelize/lib/utils/join-sql-fragments");

// define constants
const allowedTags = ["Exam", "Exercise", "Learning"];

/**
 * Add tag to a plan with plan_id
 * @param {*} tags List of tags to be added to the plan 
 * @param {*} plan_id The plan_id of the plan
 */
async function addTag(tags, plan_id) {
    for (let tag of tags) {
        if (!allowedTags.includes(tag)) {
            throw new ValidationError("invalid tag");
        };

        var tagInstance = await planModel.PlanTypes.findOrCreate({
            where: {
                typeName: tag
            }
        });

        await planModel.PlanTypeAssociation.findOrCreate(
            {
                where: {
                    plan_id: plan_id,
                    plan_type_id: tagInstance[0].plan_type_id,
                }
            }
        );


    }
}

/**
 * Add invitation to a plan
 * @param {*} invitees A list of user_id of the users being invited
 * @param {*} plan_id The id of the plan
 * @returns 
 */
async function addInvitee(invitees, plan_id) {
    // TODO: respond with 400 if trying to invite creator

    for (let inv_id of invitees) {
        inv_id = parseInt(inv_id);
        var inv = await User.findByPk(inv_id);
        if (!inv) {
            throw new ValidationError("invitee not found");
        }

        await planModel.Invitations.findOne({
            where: {
                plan_id: plan_id,
                invitee: inv_id
            }
        }).then((invitation) => {
            if (invitation) {
                throw new ValidationError("invitation existed");
            }
        });

        await planModel.Invitations.create(
            {
                plan_id: plan_id,
                invitee: inv_id,
            }
        );
    }
}

/**
 * Remove participant from a plan
 * @param {*} removed_participants List of particpants_id to be removed  
 * @param {*} plan_id  The plan id of the plan where the participants are removed
 */
async function removeParticipants(removed_participants, plan_id) {
    for (let parUserID of removed_participants) {
        var parInstance = await planModel.PlanParticipantsStatus.findOne(
            {
                where: {
                    joined_plan_id: plan_id,
                    participant_id: parUserID,
                }
            }
        );
        if (parInstance) parInstance.destroy();
    }
}


/**
 * sync all the model used in the controller 
 */
exports.sync = async () => {
    await User.sync({ alter: false });
    await planModel.Plan.sync({ alter: false });
    await planModel.PlanTypes.sync({ alter: false });
    await planModel.Invitations.sync({ alter: false });
    await planModel.Discussion.sync({ alter: true });
    await planModel.Applications.sync({ alter: true });
    await planModel.PlanParticipantsStatus.sync({ alter: true });
    await planModel.PlanTypeAssociation.sync({ alter: true });
};

/**
 * create a new plan
 * 
 * Example format:
 * ```
 * {
 *  "name": "example name",
 *  "goal": "cool goal",
 *  "introduction": "cool introduction",
 *  "progression": {
 *      "english": 10,
 *      "chinese": 5,
 *  },
 *  "start_date": "2024-03-21",
 *  "end_date": "2024-09-07",
 *  "application_problem": "hello?",
 *  "tags": ["tag1", "tag2", "tag3"],
 *  "invitees": ["1", "2", "4"],
 *  "need_review": false,
 * }
 * ```
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.createPlan = async (req, res) => {
    // NOTE: not implemented progression creation yet

    var newPlan = null;
    try {
        const user_id = req.user_id;
        const { tags, invitees, progression, ...body } = req.body;
        body.created_user_id = user_id;

        newPlan = await planModel.Plan.create(body);

        // creaet tags for the plan
        await addTag(tags, newPlan.plan_id);

        // create invitations for the plan
        await addInvitee(invitees, newPlan.plan_id);

        // add creator as an participants?
        await planModel.PlanParticipantsStatus.create(
            {
                joined_plan_id: newPlan.plan_id,
                participant_id: user_id
            }
        );

        res.status(200).json({ "message": "plan created" });

    } catch (error) {
        if (newPlan) await newPlan.destroy();

        if (error instanceof ValidationError) res.status(400).json({ message: error.message });

        console.error("Error creating new plan", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * update current plan given the plan_id parameter. Only the creator of the plan can edit the plan(?)
 * 
 * Example format:
 * ```
 * {
 *  "name": "example name",
 *  "goal": "cool goal",
 *  "introduction": "cool introduction",
 *  "progression": {
 *      "english": 10,
 *      "chinese": 5,
 *  },
 *  "start_date": "2024-03-21",
 *  "end_date": "2024-09-07",
 *  "application_problem": "hello?",
 *  "tags": ["tag1", "tag2", "tag3"],
 *  "invitees": ["1", "2", "4"],
 *  "need_review": false,
 *  "is_grouped": false,
 *  "removed_participants": ["1", "2", "3"],
 * }
 * ```
 * 
 * @param
 * @param {*} req 
 * @param {*} res 
 */
exports.updatePlan = async (req, res) => {
    try {
        const user_id = req.user_id;
        const plan_id = req.params.plan_id;

        const plan = await planModel.Plan.findByPk(plan_id);

        if (!plan) {
            return res.status(400).json({ error: "Plan not found" });
        }

        // authorization
        if (plan.created_user_id != user_id) {
            return res.status(403).json({ error: 'You are not authorized to update this plan' });
        }

        const { removed_participants, invitees, tags, progression, ...updateParams } = req.body;

        await plan.update(updateParams);

        // create invitations for the plan
        await addInvitee(invitees, plan_id);

        // remove participants
        if (removed_participants)
            await removeParticipants(removed_participants, plan_id);


        // check tag
        await planModel.PlanParticipantsStatus.findAll({
            where: {
                joined_plan_id: plan_id
            }
        }).then(async (tagInstances) => {
            for (let tagInstance of tagInstances) {
                await tagInstance.destroy();
            }
        });

        // creaet tags for the plan
        await addTag(tags, plan_id);

        try {
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ message: "invalid tag" });
        }

        res.status(200).send("plan updated");

    } catch (error) {
        console.error("Error updating plan", error);

        if (error instanceof TypeError) res.status(400).json({ message: "invalid body format" });
        if (error instanceof ValidationError) res.status(400).json({ message: error.message });
        else res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * delete the a pan given the plan_id parameter
 * @param {*} req 
 * @param {*} res 
 */
exports.deletePlan = async (req, res) => {
    try {
        const user_id = req.user_id;
        const plan_id = req.params.plan_id;

        // Find the plan by ID
        var plan = await planModel.Plan.findByPk(plan_id);

        // If plan not found, return 404 error
        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        // check if the user is the creator of the plan
        // NOTE: move to middleware?
        if (plan.created_user_id != user_id) {
            return res.status(403).json({ error: 'You are not authorized to delete this plan' });
        }
        await plan.destroy();

        res.status(204).send("sucessfully delete");
    } catch (error) {
        // If any error occurs, handle it and send a 500 error response
        console.error('Error deleting plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * get the detail of the plan
 * @param {*} req 
 * @param {*} res 
 */
exports.getPlanDetail = async (req, res) => {
    // NOTE: no need to get the plan progress for now

    try {
        const user_id = req.user_id;
        const plan_id = req.params.plan_id;
        var plan = await planModel.Plan.findByPk(plan_id, {
            include: [
                {
                    model: User,
                    as: 'Creator',
                },
                {
                    model: User,
                    as: 'Participants',
                },
                {
                    model: planModel.Discussion,
                    as: "Discussions",
                },
                {
                    model: planModel.PlanTypes,
                }
            ],
        });


        if (plan == null) return res.status(400).send("no plan");

        var accessRight = 0;
        if (
            planModel.PlanParticipantsStatus.findOne({
                where: {
                    joined_plan_id: plan_id,
                    participant_id: user_id
                }
            })
        ) accessRight = 1;
        if (plan.created_user_id == user_id) accessRight = 2;

        if (accessRight == 0) {
            return res.status(200).json(plan);
        } else if (accessRight == 1) {
            // NOTE: add self progress
            return res.status(200).json(plan);

        } else if (accessRight == 2) {
            // NOTE: add all progress
            return res.status(200).json(plan);

        }

        res.status(500).json({ error: "invalid access right" });

    } catch (error) {
        console.error("Error getting plan detail", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * get all the plan with limit and offset specified
 * @param {*} req 
 * @param {*} res 
 */
exports.getPlanList = async (req, res) => {
    try {
        const user_id = req.user_id;
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;
        const start_date = req.query.start_date;
        const end_date = req.query.end_date;
        const search = req.query.search;
        const mode = req.query.mode || "all";

        allowModes = ["owned", "joined", "all"];

        if (allowModes.includes(mode) == false) return res.status(400).send("invalid mode");

        // set search condition
        var condition = {};

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

        const plans = await planModel.Plan.findAll({
            include: includeConditions,
            where: condition,
            limit: limit,
            offset: offset,
        });

        res.status(200).json(plans);
    } catch (error) {
        console.error("Error getting plan detail", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

/* ================================ Participants ================================ */

/**
 * get application detail with application id, only the corresponding plan creator could call this endpoint
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
        "plan_id": 1,
        "is_approved": false,
        "application_response": "This is a response for the applicant"
    }
    */

    try {
        const user_id = req.user_id;
        const application_id = req.params.application_id;
        const application = await planModel.Applications.findByPk(application_id, {
            include: [
                {
                    model: User,
                    as: "Applicant",
                },
                {
                    model: planModel.Plan,
                    as: "Plan",
                    attributes: ['plan_id'],
                }
            ]
        });

        // validation
        const plan_id = application.plan_id;
        const plan = await planModel.Plan.findByPk(plan_id);
        if (plan.created_user_id != user_id) return res.status(403).send("authorization failed");
        if (!application) return res.status(400).send("application not found");

        res.status(200).json(application);
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get all application for the specific plan. Only the creator of the plan could call this endpoint.
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
            "plan_id": 1,
            "is_approved": false,
            "application_response": "This is a response for the applicant"
        }
    ]
    */

    try {
        const user_id = req.user_id;
        const plan_id = req.params.plan_id;
        const plan = await planModel.Plan.findByPk(plan_id);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }
        if (plan.created_user_id != user_id) {
            return res.status(403).json({ error: 'authorization failed' });
        }

        const applications = await planModel.Applications.findAll({
            where: {
                plan_id: plan_id
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
 * verify for applications. Only the creator of the plan could call the endpoint
 * @param {*} req 
 * @param {*} res 
 */
exports.approve = async (req, res) => {
    try {
        const user_id = req.user_id;
        const application_id = req.params.application_id;
        const application = await planModel.Applications.findByPk(application_id);

        // validation
        if (!application) return res.status(400).send("application not found");
        if (application.is_approved == true) return res.status(400).send("application has been approved");

        // get plan
        const plan_id = application.plan_id;
        const plan = await planModel.Plan.findByPk(plan_id);

        if (!plan) return res.status(400).send("plan not found");
        if (plan.created_user_id != user_id) return res.status(403).send("authorization failed");

        // get applicant
        const applicant_id = application.applicant_id;

        participantsExist = await planModel.PlanParticipantsStatus.findOne({
            where: {
                joined_plan_id: plan_id,
                participant_id: applicant_id,
            }
        });

        if (participantsExist) return res.status(400).send("participant has already joined");

        // deleteApplication
        await application.destroy();

        // update participants
        await planModel.PlanParticipantsStatus.create(
            {
                joined_plan_id: plan_id,
                participant_id: applicant_id,
            }
        );
        res.status(200).send("approved!");

    } catch (error) {
        console.error('Error approving application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * join specific plan, except the user has joined it already
 * @param {*} req 
 * @param {*} res 
 */
exports.applyPlan = async (req, res) => {
    /* NOTE: request body
    {
        "application_response": "string"
    }
    */

    try {
        const user_id = req.user_id;
        const plan_id = req.params.plan_id;
        const plan = await planModel.Plan.findByPk(plan_id);

        if (!plan) return res.status(400).send("Plan not found");
        if (plan.created_user_id == user_id) return res.status(403).json({ message: "creator cannot apply for a plan" });

        if (
            !planModel.PlanParticipantsStatus.findOne({
                where: {
                    joined_plan_id: plan_id,
                    participant_id: user_id
                }
            })
        ) return res.status(403).send("participant existed");

        const application_response = req.body.application_response; // TODO: need to check if the paramter exists

        await planModel.Applications.create(
            {
                application_response: application_response,
                applicant_id: user_id,
                plan_id: plan_id,
            }
        );

        res.status(201).send("Successfully send the application");
    } catch (error) {
        console.error('Error applying for plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


/**
 * Leave a certain plan
 * @param {*} req 
 * @param {*} res 
 */
exports.leavePlan = async (req, res) => { };


/**
 * Invite user to join a plan
 * NOTE: not implemented for we now inviting user with updatePlan API
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.inviteUser = async (req, res) => { };

/**
 * Accept/Decline Invitation for joining plan
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.respondToInvitation = async (req, res) => {
    try {
        const user_id = req.user_id;
        const plan_id = req.params.plan_id;
        const { ...body } = req.body;

        invitation = await planModel.Invitations.findOne({
            where: {
                "plan_id": plan_id,
                "invitee": user_id,
            }
        });

        if (!invitation) return res.status(400).json({ message: "not invited" });

        await planModel.Plan.findByPk(plan_id).then(
            (plan) => {
                if (!plan) return res.status(400).json({ message: "plan not found" });
            }
        );

        // join the plan
        await planModel.PlanParticipantsStatus.findOne({
            where: {
                joined_plan_id: plan_id,
                participant_id: user_id,
            }
        }).then((planParti) => {
            if (planParti) return res.status(400).json({ message: "already in the plan" });
        });

        if (body.accepted)
            await planModel.PlanParticipantsStatus.create({
                joined_plan_id: plan_id,
                participant_id: user_id,
            });

        await invitation.destroy();

        res.status(200).json({ message: "response sent" });
    } catch (error) {

    }
};


/* ================================ Discussion ================================ */
exports.getDiscussion = async (req, res) => {
    try {
        const plan_id = req.params.plan_id;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        // validation
        const plan = planModel.Plan.findByPk(plan_id);
        if (!plan) return res.status(400).send("Plan not found");

        const discussions = await planModel.Discussion.findAll({
            include: [
                {
                    model: User,
                    as: "Sender",
                },
                {
                    model: planModel.Plan,
                    as: "Plan",
                    where: {
                        plan_id: plan_id,
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
        const plan_id = req.params.plan_id;
        const content = req.body.content;

        // validation
        const plan = planModel.Plan.findByPk(plan_id);
        if (!plan) return res.status(400).send("Plan not found");

        var isParicipant = planModel.PlanParticipantsStatus.findOne({
            where: {
                joined_plan_id: plan_id,
                participant_id: user_id
            }
        });
        if (plan.created_user_id != user_id && !isParicipant) return res.status(403).send("authorization failed");

        const discussion = planModel.Discussion.create(
            {
                sender_id: user_id,
                plan_id: plan_id,
                content: content,
            }
        );

        res.status(201).send("discussion made");

    } catch (error) {
        console.error('Error making discussion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};