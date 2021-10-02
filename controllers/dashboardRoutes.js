const router = require("express").Router();
const { Habit, Log, User } = require("../models");
const { withAuth } = require("../utils/auth");
const sequelize = require("../config/connection");

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
      where: {
        user_id: req.session.userId,
        status: "Done",
      },
    });
    // count log date
    const DateCountData = await sequelize.query(
      `SELECT count(distinct date(entry_date)) as count FROM log where user_id = ? `,
      { replacements: [req.session.userId] }
    );
    // count consecutive date
    const ConsecutiveCountData = await sequelize.query(
      `SELECT *  from (
      SELECT COUNT(*) as CNT, min(dt) start_date, max(dt) as end_date
      FROM (SELECT DATE(entry_date) dt, DATE_ADD(DATE(entry_date), INTERVAL - ROW_NUMBER() OVER (ORDER BY entry_date) DAY) as col
      FROM log 
      where user_id=1
      GROUP BY entry_date 
      ORDER BY entry_date) B
      GROUP BY col
      )A where  end_date BETWEEN CURDATE() - INTERVAL 2 DAY AND CURDATE()
      ORDER BY end_date desc`,
      { replacements: [req.session.userId] }
    );

    // Serialize data so the template can read it
    const habits = habitData.map((habit) => habit.get({ plain: true }));
    const Logs = LogData.map((log) => log.get({ plain: true }));
    const DateCount = DateCountData[0][0].count;
    const ConsecutiveCount = ConsecutiveCountData[0][0].CNT;
   
    // Pass serialized data and session flag into template
    res.render("dashboard", {
      habits,
      Logs,
      DateCount,
      ConsecutiveCount,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
