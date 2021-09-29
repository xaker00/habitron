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

        const habits = habitData.map((habit) => habit.get({ plain:true }));

        console.log(habits);

        res.render('app', {
            habits: habits,
            logged_in: req.session.logged_in,
        });
    }catch (err) {
        res.status(500).json(err);
    }
});     



module.exports = router;