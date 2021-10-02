const router = require("express").Router();
const { withAuthApi } = require("../../utils/auth");
const { Habit } = require("../../models");
const session = require("express-session");

console.log("Start")
// list all habits for user
router.get("/", withAuthApi, async (req, res) => {
  console.log("list all habit ");
  try {
    const dbHabitData = await Habit.findAll({
      where: { user_id: req.session.userId },
    });
    res.status(200).json(dbHabitData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add new habit
router.post("/", withAuthApi, async (req, res) => {
  try {
    const dbHabitData = await Habit.create({
      description: req.body.habit,
      status: "Active",
      user_id: req.session.userId,
    });
    res.status(201).json(dbHabitData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// edit habit
router.put("/:id", withAuthApi, async (req, res) => {
  console.log("run edit habit ");
  try {
    const count = await Habit.update(req.body, {
      where: { id: req.params.id, userId: req.session.userId },
    });
    if (count === 0) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    // mysql does not return data on update, so we have to get it manually 😞
    const dbHabitData = await Habit.findAll({ where: { id: req.params.id } });
    console.log(dbHabitData);
    res.status(200).json(dbHabitData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete habit
router.delete("/:id", withAuthApi, async (req, res) => {
  console.log("run delete habit ");
  try {
    const count = await Habit.destroy({
      where: { user_id: req.session.userId, id: req.params.id },
    });
    if (count === 0) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ rows_affected: count });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
