const router = require("express").Router();
const {withAuthApi} = require("../../utils/auth");
const { Habit } = require("../../models");

// list all habits for user
router.get("/", withAuthApi, async (req, res) => {
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
    const dbHabitData = await Habit.create(req.body);
    res.status(201).json(dbHabitData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// edit habit
router.put("/:id", withAuthApi, async (req, res) => {
  try {
    const [count, dbHabitData] = await Habit.update(req.body, {
      where: { id: req.params.id },
    });
    if (count === 0) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(201).json(dbHabitData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete habit
router.delete("/:id", withAuthApi, async (req, res) => {
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
