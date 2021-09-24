const router = require("express").Router();
const { Habit } = require("../../models");

// list all habits for user
router.get("/", async (req, res) => {
  try {
    const dbHabitData = await Habit.findAll({ where: { user_id: req.session.id } });
    res.status(200).json(dbHabitData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add new habit
router.post("/", async (req, res) => {
  try {
    const dbHabitData = await Habit.create(req.body);
    res.status(201).json(dbHabitData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/", async (req, res) =>{
    try{

    }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;
