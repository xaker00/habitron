const sequelize = require("../config/connection");
const { User, Log, Habit } = require("../models");

const userData = require("./userData.json");
const logData = require("./logData.json");
const habitData = require("./habitData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const habits = [];
  for (const habit of habitData) {
    habits.push(
      await Habit.create({
        ...habit,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      })
    );
  }

  const logs = [];
  for (const log of logData) {
    logs.push(
      await Log.create({
        ...log,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        habit_ID: habits[Math.floor(Math.random() * habits.length)].id,
      })
    );
  }

  process.exit(0);
};

seedDatabase();
