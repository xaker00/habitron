const router = require("express").Router();
const { Habit, Log, User } = require("../models");
const { withAuth } = require("../utils/auth");

//show all the habit
router.get("/", withAuth, async (req, res) => {
  console.log("Start Dashboard Route to get all habit by users");
  try {
    //show all the habit
    console.log("getting user habit: ", req.session.userId);
    const habitData = await Habit.findAll({
      where: {
        user_id: req.session.userId,
      },
      attributes: ["id", "category", "description", "status", "created_at"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    //show all the log
    const LogData = await Log.findAll({
      where: { user_id: req.session.userId },
    });
    // count log date
    const DateCount = await Log.findAll({
      attributes: [
         "entry_date"
        //  [sequelize.literal("COUNT (DISTINCT (entry_date))"), "myCount"],
        // [[Sequelize.fn("COUNT", Sequelize.col("entry_date.id")), "sensorCount"]] 
      ],
      where: { user_id: req.session.userId },
    });
    // Serialize data so the template can read it
    const habits = habitData.map((habit) => habit.get({ plain: true }));
    console.log(DateCount);
    // Pass serialized data and session flag into template
    res.render("dashboard", {
      habits,
      LogData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
 
module.exports = router;