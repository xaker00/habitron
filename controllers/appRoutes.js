const router = require("express").Router();
const { Habit, Log, User } = require("../models");
const {withAuth} = require("../utils/auth");
// const Habit = require('../models/Habit');

router.get("/", withAuth, async (req, res) => {
    try{ 
        const habitData = await Habit.findAll({
            where: {
                user_id: req.session.userId,
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const logData = await Log.findAll({
            where: {
                user_id: req.session.userId,
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Habit,
                    attributes: ['description'],
                },
            ],
        });
        const habits = habitData.map((habit) => habit.get({ plain:true }));
        const logs = logData.map((log) => log.get({ plain:true }));


        // console.log(habits);
        // console.log(logs);

        res.render('app', {
            habits: habits,
            logs: logs,
            logged_in: req.session.logged_in,
        });
    }catch (err) {
        res.status(500).json(err);
    }
});     



module.exports = router;