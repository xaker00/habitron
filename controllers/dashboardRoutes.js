const router = require("express").Router();
const { Habit, Log, User } = require("../models");
const { withAuth } = require("../utils/auth");

//show all the habit
router.get("/", withAuth, async (req, res) => {
  console.log("Start Dashboard Route to get all habit by users");
  try {
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
    // Serialize data so the template can read it
    const habits = habitData.map((habit) => habit.get({ plain: true }));
    console.log(habits);
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
