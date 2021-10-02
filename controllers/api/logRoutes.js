const router = require("express").Router();
const { withAuthApi } = require("../../utils/auth");
const { Log, Habit } = require("../../models");
const Op = require("sequelize").Op;

// get log entries for currently logged in user
router.get("/", withAuthApi, async (req, res) => {
  try {
    const dbLogData = await Log.findAll({
      where: { user_id: req.session.userId },
    });
    res.status(200).json(dbLogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add new log entry
// if duplicate habit_id is detected for the same day, the existing record is modified
router.post("/", withAuthApi, async (req, res) => {
  try {

    // make sure we are not stealing other users habits
    const userHabitExists = await Habit.count({where:{
      user_id: req.session.userId,
      id: req.body.habit_id
    }});

    if(!userHabitExists){
      res.status(500).json({message:'Habit does not exist for user'});
      return;
    }


    const existingLog = await Log.findOne({
      where: {
        entry_date: req.body.entry_date,
        habit_id: req.body.habit_id,
        user_id: req.session.userId,
      },
    });

    if (existingLog) {
      // update
      const count = await Log.update(req.body, {
        where: {
          habit_id: req.body.habit_id,
          user_id: req.session.userId,
        },
      });
      const dbLogData = await Log.findOne({
        where: {
          entry_date: req.body.entry_date,
          habit_id: req.body.habit_id,
          user_id: req.session.userId,
        },
      });
      res.status(200).json(dbLogData);
      return;
    } else {
      // create
      const dbLogData = await Log.create({
        user_id: req.session.userId,
        ...req.body,
      });
      res.status(201).json(dbLogData);
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

module.exports = router;
