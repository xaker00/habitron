const router = require("express").Router();
const { withAuthApi } = require("../../utils/auth");
const { Habit } = require("../../models");
const session = require("express-session");
const sequelize = require("../../config/connection");

router.get("/", withAuthApi, async (req, res) => {
  try {
    // bar chart data
    const ChartData = await sequelize.query(
      `select entry_date , count(id) as records from log where user_id=? and entry_date BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() group by entry_date order by entry_date`,
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