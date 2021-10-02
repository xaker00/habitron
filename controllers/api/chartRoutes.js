const router = require("express").Router();
const { withAuthApi } = require("../../utils/auth");
const { Habit } = require("../../models");
const session = require("express-session");
const sequelize = require("../../config/connection");

router.get("/", withAuthApi, async (req, res) => {
  try {
    // bar chart data
    const ChartData = await sequelize.query(
      ` select entry_date , count(a.id) as records from log a inner join habit b on a.user_id=b.user_id and a.habit_id=b.id where a.user_id =? and a.status='Done' and entry_date BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() group by entry_date order by entry_date`,
      { replacements: [req.session.userId] }
    );
    const Charts = ChartData[0];
    res.status(200).json(ChartData[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;