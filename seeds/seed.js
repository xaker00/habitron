const sequelize = require("../config/connection");
const { User, Log, Habit } = require("../models");

const userData = require("./userData.json");
const logData = require("./logData.json");
const habitData = require("./habitData.json");

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


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
        entry_date: randomDate(new Date(2021, 8, 1), new Date()),
        user_id: users[Math.floor(Math.random() * users.length)].id,
        habit_id: habits[Math.floor(Math.random() * habits.length)].id,
      })
    );
  }

  for (const log of logData) {
    logs.push(
      await Log.create({
        ...log,
        entry_date: randomDate(new Date(2021, 9, 1), new Date()),
        user_id: users[Math.floor(Math.random() * users.length)].id,
        habit_id: habits[Math.floor(Math.random() * habits.length)].id,
      })
    );
  }
  

  process.exit(0);
};

seedDatabase();
