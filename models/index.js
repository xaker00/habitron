const Habit = require("./Habit");
const Log = require("./Log");
const User = require("./User");

User.hasMany(Habit, {
  foreignKey: "user_id",
});

Habit.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Log.belongsTo(User, {
  foreignKey: "user_ID",
  onDelete: "cascade",
});

Log.belongsTo(Habit, {
  foreignKey: "habit_ID",
  onDelete: "cascade",
});

User.hasMany(Log, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Habit.hasMany(Log, {
  foreignKey: "habit_ID",
  onDelete: "cascade",
});

module.exports = { User, Log, Habit };
