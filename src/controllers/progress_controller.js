const planModel = require("../model/planModel");
// const { sequelize, Sequelize } = require('../../database');
const progressModel = require("../model/progressModel");
const User = require("../model/userModel");

exports.sync = async () => {
    try{
    
        await User.sync({ alter: false });
        await progressModel.Progress.sync({ alter: false });
        await progressModel.UserProgress.sync({ alter: false });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error('Error syncing models: ', error);
    }

};

exports.getAllUserProgress = async (req, res) => {
    try {
        const { plan_id, user_id } = req.body;      

        // \Find targetPlan for progresses
        const targetPlan = await progressModel.Progress.findAll({
            where: { plan_id: plan_id},
        });
        
        
        const progressIds = targetPlan.map(plan => plan.progress_id);
        console.log("progressIds", progressIds);

        let queryOptions = {
                where: {
                    progress_id: progressIds
                },
                include:[
                    {
                        model: User,
                        as: 'Users',
                        // where: {
                        //     user_id: user_id
                        // },
                        attributes: ['name']
                    },
                    {
                        model: progressModel.Progress,
                        as: 'progress',
                        where: {
                            progress_id: progressIds
                        },
                        attributes: ['name']
                    },
                ]

        };

        const AlluserProgress = await progressModel.UserProgress.findAll(queryOptions);
              
        if (AlluserProgress.length === 0) {
            return res.status(404).json({ error: 'No progress found for the given plan.' });
        }  
        // console.log(AlluserProgress);

        // Filter the data to only include entries where is_finished is true
        const progressSummary = AlluserProgress.reduce((acc, cur) => {
            const key = `${cur.user_id}-${cur.progress_id}`; // Create a unique key for each user_id and progress_id pair
            
            
            if (!acc[key]) {
              acc[key] = {
                user_id: cur.user_id,
                progress_id: cur.progress_id,
                user_name: cur.Users.name,
                progress_name: cur.progress.name,
                finished_count: 0,
                total_count: 0
              };
            }
            if (cur.is_finished) {
              acc[key].finished_count++;
            }
            acc[key].total_count++;
            return acc;
          }, {});
          
        // console.log(progressSummary);

        

        return res.status(200).json({ progressSummary });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

exports.getOwnUserProgress = async (req, res) => {
    try {
        const { plan_id }  = req.params;
        const user_id = req.user_id;

        // console.log("plan_id", plan_id);
        // console.log("user_id", user_id);
        // const user_id = req.user_id; 
        

        // const targetProgress = await progressModel.Progress.findByPk(progress_id);
        const targetPlan = await progressModel.Progress.findAll({
            where: { plan_id: plan_id},
        });
        // console.log(targetPlan);

        
        const progressIds = targetPlan.map(plan => plan.progress_id);
        // console.log("progressIds", progressIds);

        let queryOptions = {
                where: {
                    progress_id: progressIds
                },
                include:[
                    {
                        model: User,
                        as: 'Users',
                        where: {
                            user_id: user_id
                        },
                        attributes: ['name']
                    },
                    {
                        model: progressModel.Progress,
                        as: 'progress',
                        where: {
                            progress_id: progressIds
                        },
                        attributes: ['name']
                    },
                ]

        };

        const AlluserProgress = await progressModel.UserProgress.findAll(queryOptions);
              
        if (AlluserProgress.length === 0) {
            return res.status(404).json({ error: 'No progress found for the given plan.' });
        }  
        // console.log(AlluserProgress);

        // Filter the data to only include entries where is_finished is true
        const progressSummary = AlluserProgress.reduce((acc, cur) => {
            const key = `${cur.user_id}-${cur.progress_id}`; // Create a unique key for each user_id and progress_id pair
            
            
            if (!acc[key]) {
              acc[key] = {
                user_id: cur.user_id,
                progress_id: cur.progress_id,
                user_name: cur.Users.name,
                progress_name: cur.progress.name,
                finished_count: 0,
                total_count: 0
              };
            }
            if (cur.is_finished) {
              acc[key].finished_count++;
            }
            acc[key].total_count++;
            return acc;
          }, {});
          
        // console.log(progressSummary);

        

        return res.status(200).json({ progressSummary });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

exports.getUserProgress = async (req, res) => {
    try {
        const { progress_id } = req.params; 
        const user_id = req.user_id; 

        let queryOptions = {
            where: { user_id: user_id,  progress_id: progress_id},
        };

        const userProgress = await progressModel.UserProgress.findAll(queryOptions);

        if (userProgress.length === 0) {
            return res.status(404).json({ error: 'No progress found for the given user.' });
        }

        return res.status(200).json({ message: 'User Progress fetched successfully.', data: userProgress });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
  

exports.createProgress = async (req, res) => {
    try {
        const { plan_id, user_id, progressItems } = req.body;
        const plan = await planModel.Plan.findByPk(plan_id);
        // console.log(progressItems);
        
        try {
            for (const progressItem of progressItems) {
                const { times, progress_id } = progressItem;
                for (let i = 0; i < times; i++) {
                    const newUserProgress = await progressModel.UserProgress.create({
                        user_id: user_id,
                        progress_id: progress_id, 
                        description: '', 
                        user_progress_date: '' || plan.end_date,
                        activity_detail: '', 
                        is_finished: false
                    });
                
                    // console.log(`UserProgress ${i+1} created:`, newUserProgress);
                }
            }
            return res.status(201).json({ message: "UserProgress entries created successfully." });
        } catch (error) {
            console.log({error: error.message});
        }

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

exports.createUserProgress = async (req, res) => {
    try {
        const { plan_id, user_id } = req.body;
        const plan = await planModel.Plan.findByPk(plan_id);
        const progress = await progressModel.Progress.findAll({
            where:{
                plan_id: plan_id
            }
        });
        console.log(progress);
        
        try {
            for (const progressItem of progress) {
                const { times, progress_id } = progressItem;
                for (let i = 0; i < times; i++) {
                    const newUserProgress = await progressModel.UserProgress.create({
                        user_id: user_id,
                        progress_id: progress_id, 
                        description: '', 
                        user_progress_date: '' || plan.end_date,
                        activity_detail: '', 
                        is_finished: false
                    });
                
                    // console.log(`UserProgress ${i+1} created:`, newUserProgress);
                }
            }
            // if (!newUserProgress) return res.status(400).json({ message: "UserProgress entries created fail." });
            
            return res.status(201).json({ message: "UserProgress entries created successfully." });
        } catch (error) {
            console.log({error: error.message});
        }
        // return res.status(200).json("successful");

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}


// exports.updateProgress = async (req, res) => {
//     try {
//         const user_id = req.user_id;
//         const { progress_id } = req.params;
//         const { name, times, need_activity } = req.body;

//         // authorization
        
//         const progressToUpdate = await progressModel.Progress.findByPk(progress_id);
//         if (!progressToUpdate) {
//             return res.status(404).json({ error: 'Progress not found.' });
//         }

//         const plan = await planModel.Plan.findByPk(progressToUpdate.plan_id);
//         if (plan.created_user_id != user_id) {
//             return res.status(403).json({ error: 'You are not authorized to update this progress.' });
//         }

        

//         progressToUpdate.name = name || progressToUpdate.name;
//         progressToUpdate.times = times || progressToUpdate.times;
//         progressToUpdate.need_activity = need_activity || progressToUpdate.need_activity;

//         const updatedProgress = await progressToUpdate.save();
//         // console.log("Updated Progress:", updatedProgress);

//         return res.status(200).json({ message: 'Progress updated successfully.', data: updatedProgress });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: error.message });
//     }
// };



exports.updateUserProgress = async (req, res) => {
    try {
        const user_id = req.user_id;
        const userProgress_id = req.params.userprogress_id;
        const { description, activity_detail, is_finished, user_progress_date } = req.body;

        const userProgressToUpdate = await progressModel.UserProgress.findByPk(userProgress_id);
        if (!userProgressToUpdate) {
            return res.status(404).json({ error: 'User Progress not found.' });
        }

        if (userProgressToUpdate.user_id != user_id) {
            return res.status(403).json({ error: 'You are not authorized to update this user progress.' });
        }
        userProgressToUpdate.user_progress_date = user_progress_date || userProgressToUpdate.user_progress_date;
        userProgressToUpdate.description = description || userProgressToUpdate.description;
        userProgressToUpdate.activity_detail = activity_detail || userProgressToUpdate.activity_detail;
        userProgressToUpdate.is_finished = is_finished || userProgressToUpdate.is_finished;

        const updatedUserProgress = await userProgressToUpdate.save();

        return res.status(200).json({ message: 'User Progress updated successfully', data: updatedUserProgress });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

