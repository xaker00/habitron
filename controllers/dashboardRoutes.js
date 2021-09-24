const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

//show all the habit
router.get("/", withAuth, async (req, res) => {
  console.log("Start Dashboard Route to get all habit by users");
  try {
    console.log("getting user habit: ", req.session.user_id);
    const habitData = await Habit.findAll({
      
    });
    // Serialize data so the template can read it
    console.log(habitData);
    const habits = habitData.map((habit) => habit.get({ plain: true }));
    console.log(habit);
    // Pass serialized data and session flag into template
    res.render("dashboard", {
      habits,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
 
module.exports = router;
