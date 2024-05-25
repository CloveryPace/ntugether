const { ValidationError, Op } = require("sequelize");
const planModel = require("../model/planModel");
const User = require("../model/userModel");
const progressController = require('./progress_controller');
const progressModel = require("../model/progressModel");
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
        console.log(parInstance);

        if (parInstance) parInstance.destroy();
    }
}

async function needReviewApply(req, res, plan_id, user_id, application_response) {

    participantsExist = await planModel.PlanParticipantsStatus.findOne({
        where: {
            joined_plan_id: plan_id,
            participant_id: user_id,
        }
    });

    if (participantsExist) return res.status(400).send("applier has already joined");


    const applicantExist = await planModel.Applications.findOne({
        where: {
            applicant_id: user_id,
            plan_id: plan_id
        }
    });

    if (applicantExist) return res.status(409).send("Applicant already exist.");

    // const application_response = req.body.application_response; // TODO: need to check if the paramter exists
    if (application_response !== undefined) {
        planModel.Applications.create(
            {
                application_response: application_response,
                applicant_id: user_id,
                plan_id: plan_id
            }
        );
    }
    return res.status(201).send("Successfully send the application");
}


async function noReviewApply(req, res, plan_id, user_id) {
    participantsExist = await planModel.PlanParticipantsStatus.findOne({
        where: {
            joined_plan_id: plan_id,
            participant_id: user_id,
        }
    });

    if (participantsExist) return res.status(400).send("applier has already joined");

    const user = await User.findOne({
        where: { user_id: user_id }

    });




    // update participants
    await planModel.PlanParticipantsStatus.create(
        {
            joined_plan_id: plan_id,
            participant_id: user_id
        }
    );

    const progressReq = {
        body: {
            user_id: user_id,
            plan_id: plan_id

        }
    };
    const progressRes = {
        status: () => ({ json: (json) => json }),
    };

    const progressResponse = await progressController.createUserProgress(progressReq, progressRes);
    // console.log(progressResponse);


    return res.status(200).send("joined!");


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

        const newPlan = await planModel.Plan.create(body);

        // create process
        const newProgress = await Promise.all(progression.map(async (prog) => {
            return await progressModel.Progress.create({
                name: prog.name,
                times: prog.times,
                need_activity: prog.need_activity,
                plan_id: newPlan.plan_id
            });
        }));

        console.log(newProgress);

        const progressReq = {
            body: {
                progressItems: newProgress,
                user_id: user_id,
                plan_id: newPlan.plan_id
            }
        };
        const progressRes = {
            status: () => ({ json: (json) => json }),
        };

        
        const progressResponse = await progressController.createProgress(progressReq, progressRes);
        // console.log(progressResponse);



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

        return res.status(201).json({ "message": `plan created, plan id ${newPlan.plan_id}` });

    } catch (error) {
        if (newPlan) await newPlan.destroy();

        if (error instanceof ValidationError) res.status(400).json({ message: error.message });

        console.error("Error creating new plan", error);
        return res.status(500).json({ error: error.message });
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
            return res.status(404).json({ error: "Plan not found" });
        }

        // authorization
        if (plan.created_user_id != user_id) {
            return res.status(403).json({ error: 'You are not authorized to update this plan' });
        }

        const { removed_participants, invitees, tags, ...updateParams } = req.body;
        console.log(updateParams);
        await plan.update(updateParams);

        // create invitations for the plan
        await addInvitee(invitees, plan_id);

        // remove participants
        if (removed_participants){
            console.log("removed_participants", removed_participants);
            await removeParticipants(removed_participants, plan_id);
        }

        // check tag
        await planModel.PlanTypeAssociation.findAll({
            where: {
                plan_id: plan_id
            }
        }).then(async (tagInstances) => {
            for (let tagInstance of tagInstances) {
                await tagInstance.destroy();
            }
        });

        // create tags for the plan
        await addTag(tags, plan_id);

        try {
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ message: "invalid tag" });
        }

        return res.status(200).send({
            "message": "plan updated"
        });

    } catch (error) {
        console.error("Error updating plan", error);

        if (error instanceof TypeError) res.status(400).json({ message: "invalid body format" });
        if (error instanceof ValidationError) res.status(400).json({ message: error.message });
        else res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
};

/**
 * get the detail of the plan
 * @param {*} req 
 * @param {*} res 
 */
exports.getPlanDetail = async (req, res) => {

    try {
        const user_id = req.user_id;
        const plan_id = req.params.plan_id;
        var plan = await planModel.Plan.findByPk(plan_id, {
            include: [
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
                        attributes: []
                    }
                },
                {
                    model: planModel.Discussion,
                    as: "Discussions",
                },
                {
                    model: planModel.PlanTypes,
                    attributes: ["typeName"],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: progressModel.Progress,
                    as: 'progresses',
                    attributes: ["progress_id", "name", "times", "need_activity"]

                }
            ],
        });


        if (plan == null) return res.status(400).json({ error: "plan not found" });

        // determine the access right to get the detail view of the activity
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

        // NOTE: return plan detail based on the access right => deal with this in userprogress part
        if (accessRight == 0) {
            return res.status(200).json(plan);
        } else if (accessRight == 1) {
            
            // request for userprogress information
            const progressReq = {
                body: {
                    plan_id: plan_id,
                    user_id: user_id
                }
            };
            const progressRes = {
                status: () => ({ json: (json) => json }),
            };
    
            const progressResponse = await progressController.getAllUserProgress(progressReq, progressRes);
            console.log("res", progressResponse.progressSummary);

            return res.status(200).json({
                "plan": plan,
                'allUserProgress': progressResponse.progressSummary
            });

        } else if (accessRight == 2) {

            // request for userprogress information
            const progressReq = {
                body: {
                    plan_id: plan_id,
                    user_id: user_id
                }
            };
            const progressRes = {
                status: () => ({ json: (json) => json }),
            };

            const progressResponse = await progressController.getAllUserProgress(progressReq, progressRes);
            console.log("res", progressResponse);

            return res.status(200).json({
                "plan": plan,
                'allUserProgress': progressResponse.progressSummary
            });

        }

        res.status(500).json({ error: "invalid access right" });

    } catch (error) {
        console.error("Error getting plan detail", error);
        res.status(500).json({ error: error.message });
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
            as: 'Creator',
            attributes: ["name", "email", "phoneNum", "photo", "gender"],
            where: {
                user_id: user_id,
            }
        });
        else if (mode == "joined") includeConditions.push({
            model: User,
            as: 'Participants',
            attributes: ["name", "photo", "gender"],
            where: {
                user_id: user_id,
            },
        });
        else if (mode == "all") includeConditions.push({
            model: User,
            as: 'Participants',
            attributes: ["name"],
            through: {
                attributes: [] // Exclude all attributes from the intermediate table
            }

        });

        includeConditions.push({
            model: planModel.PlanTypes,
            through: planModel.PlanTypeAssociation,
            attributes: ['typeName'],
            through: {
                attributes: [] // Exclude all attributes from the intermediate table
            }
        });


        const plans = await planModel.Plan.findAll({
            include: includeConditions,
            where: condition,
            limit: limit,
            offset: offset,
        });
        
        
        // if (mode == "joined" || mode == "owned")
        //     return res.status(200).json({
        //         "plan": plans,
        //         'OwnUserProgress': progressResponse.progressSummary
        //     });
            
        return res.status(200).json(plans);
    } catch (error) {
        console.error("Error getting plan detail", error);
        res.status(500).json({ error: error.message });
    }
};

/* ================================ Participants ================================ */

/**
 * get application detail with application id, only the corresponding plan creator could call this endpoint
 * @param {*} req 
 * @param {*} res 
 */
exports.getApplicationDetail = async (req, res) => {

    try {
        const user_id = req.user_id;
        const application_id = req.params.application_id;
        const application = await planModel.Applications.findByPk(application_id, {
            include: [
                {
                    model: User,
                    as: "Applicant",
                    attributes: ["user_id", "name", "photo", "gender"],
                    
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
        if (plan.created_user_id != user_id) return res.status(403).send("not plan creator");
        if (!application) return res.status(404).send("application not found");

        res.status(200).json(application);
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get all application for the specific plan. Only the creator of the plan could call this endpoint.
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllApplications = async (req, res) => {

    try {
        const user_id = req.user_id;
        const plan_id = req.params.plan_id;
        const plan = await planModel.Plan.findByPk(plan_id);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }
        if (plan.created_user_id != user_id) {
            return res.status(403).json({ error: 'not plan creator' });
        }

        const applications = await planModel.Applications.findAll({
            where: {
                plan_id: plan_id,
                is_approved: false
            },
            include: 
                [{
                    model: User,
                    as: "Applicant",
                    attributes: ["user_id", "name", "photo", "gender"],
                }]
        });
        if (applications.length === 0) {
            return res.status(404).json({ error: 'Application not found or already approved' });
        }

        return res.status(200).json(applications);
    } catch (error) {
        // If any error occurs, handle it and send a 500 error response
        console.error('Error getting all applications:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllParticipants = async (req, res) => {

    try {
        // const user_id = req.user_id;

        const plan_id = req.params.plan_id;
        var plan = await planModel.Plan.findByPk(plan_id);
        if (plan == null) return res.status(404).send("Plan not found.");

        const participants = await planModel.PlanParticipantsStatus.findAll({
            where: {
                joined_plan_id: plan_id
            },
            include: [{
                model: User,
                // as: "Participants",
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
        if (!application) return res.status(404).send("application not found");
        if (application.is_approved == true) return res.status(400).send("application has been approved");

        // get plan
        const plan_id = application.plan_id;
        const plan = await planModel.Plan.findByPk(plan_id);

        // if (!plan) return res.status(400).send("plan not found");
        if (plan.created_user_id != user_id) return res.status(403).send("not plan creator");

        // get applicant
        const applicant_id = application.applicant_id;
        
        // update is_approves
        application.update(
            {
                is_approved: true,
            }
        );


        // deleteApplication
        // 不應該刪除，否則無法得知已申請通過
        // await application.destroy();

        // update participants
        await planModel.PlanParticipantsStatus.create(
            {
                joined_plan_id: plan_id,
                participant_id: applicant_id,
            }
        );

        const progressReq = {
            body: {
                user_id: applicant_id,
                plan_id: plan_id

            }
        };
        const progressRes = {
            status: () => ({ json: (json) => json }),
        };
        const progressResponse = await progressController.createUserProgress(progressReq, progressRes);
        // console.log(progressResponse);

        return res.status(200).send("approved!");

    } catch (error) {
        console.error('Error approving application:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const user_id = req.user_id;
        const application_id = req.params.application_id;
        const application = await planModel.Applications.findByPk(application_id);

        // validation
        if (!application) return res.status(404).send("application not found");
        if (application.is_approved == true) return res.status(400).send("application has been approved");

        // get plan
        const plan_id = application.plan_id;
        const plan = await planModel.Plan.findByPk(plan_id);

        // if (!plan) return res.status(400).send("plan not found");
        if (plan.created_user_id != user_id) return res.status(403).send("not plan creator");

        await application.destroy();
        return res.status(204).send("sucessfully delete");

    } catch (error) {
        console.error('Error deleting application:', error);
        return res.status(500).json({ error: error.message });
    }

}

/**
 * join specific plan, except the user has joined it already
 * @param {*} req 
 * @param {*} res 
 */
exports.applyPlan = async (req, res) => {

    const { application_response } = req.body;
    try {
        const user_id = req.user_id;
        const plan_id = req.params.plan_id;

        const plan = await planModel.Plan.findByPk(plan_id);
        if (!plan) return res.status(404).send("Plan not found");

        if (plan.created_user_id == user_id) return res.status(403).json({ message: "Plan creator should not apply" });

        // if (
        //     !planModel.PlanParticipantsStatus.findOne({
        //         where: {
        //             joined_plan_id: plan_id,
        //             participant_id: user_id
        //         }
        //     })
        // ) 
        const planNeedReview = await planModel.Plan.findOne({
            where: {
                need_reviewed: true,
                plan_id: plan_id
            }
        });
        if (planNeedReview) return needReviewApply(req, res, plan_id, user_id, application_response);
        // return res.status(400).send("participant existed");

        return noReviewApply(req, res, plan_id, user_id); //add , participant_name
    } catch (error) {
        console.error('Error applying for plan:', error);
        return res.status(500).json({ error: error.message });
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
// exports.inviteUser = async (req, res) => { };

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

        // Todo: Can selected from followers
        invitation = await planModel.Invitations.findOne({
            where: {
                "plan_id": plan_id,
                "invitee": user_id,
            }
        });

        if (!invitation) return res.status(400).json({ message: "not invited" });

        await planModel.Plan.findByPk(plan_id).then(
            (plan) => {
                if (!plan) return res.status(404).json({ message: "plan not found" });
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
        const user_id = req.user_id;
        const plan_id = req.params.plan_id;
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        // validation
        const plan = await planModel.Plan.findByPk(plan_id);
        if (!plan) return res.status(404).send("Plan not found");

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
        const plan_id = req.params.plan_id;
        const content = req.body.content;

        // validation
        const plan = await planModel.Plan.findByPk(plan_id);
        if (!plan) return res.status(404).send("Plan not found");

        var isParicipant = await planModel.PlanParticipantsStatus.findOne({
            where: {
                joined_plan_id: plan_id,
                participant_id: user_id
            }
        });
        // plan.created_user_id != user_id 
        if (!isParicipant) return res.status(403).send("User hasn't joined the plan");

        const user = await User.findOne({
            where: { user_id: user_id }

        });

        const discussion = planModel.Discussion.create(
            {
                sender_id: user_id,
                sender_name: user.name,
                plan_id: plan_id,
                content: content,
            }
        );

        res.status(201).send("discussion made");

    } catch (error) {
        console.error('Error making discussion:', error);
        res.status(500).json({ error: error.message });
    }
};