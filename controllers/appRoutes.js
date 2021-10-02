const router = require("express").Router();
const { Habit, Log, User } = require("../models");
const { withAuth } = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const habitData = await Habit.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const habits = habitData.map((habit) => habit.get({ plain: true }));

    // get 2d array of dates and habits
    const log2 = await Log.getHistory(req.session.userId, req.clientDate, 6);

    // console.log(habits);
    // console.log(logs);

    res.render("app", {
      habits: habits,
      loggedIn: req.session.loggedIn,
      log2: log2,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
