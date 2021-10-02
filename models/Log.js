const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Habit = require("./Habit");

class Log extends Model {
  /**
   * Generate 2d array of dates and habits
   * @param {*} userId
   * @param {*} clientDate
   * @param {*} days Number of days to go back (positive number)
   */
  static async getHistoryOld(userId, clientDate, days) {
    // make sure days is a negative number
    days = 0 - Math.abs(days);

    // extend date object to add day and return string
    Date.prototype.addDay = function (days) {
      const delta = days * 24 * 60 * 60 * 1000;
      let date = new Date(this.valueOf() + delta);
      return date.toISOString().slice(0, 10);
    };

    // create a list of dates
    const dateList = [];
    const startDate = new Date(clientDate);
    for (let i = days; i <= 0; i++) {
      dateList.push(startDate.addDay(i));
    }

    // get all habits for user
    const habits = await Habit.findAll({
      where: {
        user_id: userId,
      },
      order: [["id", "ASC"]],
    });

    // generate array of promises to get habits per date
    let resultGrid = dateList.map(async (date) => {
      const entry = {};
      entry.date = date;
      // generate array of promises to load log data
      entry.habits = habits.map(async (q) => {
        let logEntry = await Log.findOne({
          where: { entry_date: date, user_id: userId, habit_id: q.id },
        });
        if (!logEntry) {
          // there is no log entry for this date, put in some default data
          logEntry = { habit_id: q.id, entry_date: date };
        } else {
          // log entry exists, use unmodified
          logEntry = logEntry.get({ plain: true });
        }
        // add descriptions to log entries since we have them already
        logEntry.description = q.description;
        return logEntry;
      });
      // resolve log query promises
      entry.habits = await Promise.all(entry.habits);
      return entry;
    });

    // resolve promises
    resultGrid = await Promise.all(resultGrid);

    // console.log("habits", habits);
    // console.dir(resultGrid);
    // console.log(JSON.stringify(resultGrid));

    return resultGrid;
  }

  /**
   * Generate 2d array of dates and habits
   * @param {*} userId
   * @param {*} clientDate
   * @param {*} days Number of days to go back (positive number)
   */
   static async getHistory(userId, clientDate, days) {
    // make sure days is a negative number
    days = 0 - Math.abs(days);

    // extend date object to add day and return string
    Date.prototype.addDay = function (days) {
      const delta = days * 24 * 60 * 60 * 1000;
      let date = new Date(this.valueOf() + delta);
      return date.toISOString().slice(0, 10);
    };

    // create a list of dates
    const dateList = [];
    const startDate = new Date(clientDate);
    for (let i = days; i <= 0; i++) {
      dateList.push(startDate.addDay(i));
    }

    // get all habits for user
    const habits = await Habit.findAll({
      where: {
        user_id: userId,
      },
      order: [["id", "ASC"]],
    });

    // generate array of promises to get habits per date
    let resultGrid = habits.map(async (habit) => {
      const entry = {};
      entry.habit_id = habit.id;
      entry.description = habit.description;

      // generate array of promises to load log data
      entry.status = dateList.map(async (date) => {
        let logEntry = await Log.findOne({
          attributes:['status'],
          where: { entry_date: date, user_id: userId, habit_id: habit.id, status:'Done'},
        });
        if (!logEntry) {
          // there is no log entry for this date, put in some default data
          logEntry = { entry_date: date, status:'' };
        } else {
          // log entry exists, use unmodified
          logEntry = { entry_date: date, status:'checked', id:logEntry.id };
        }
        return logEntry;
      });
      // resolve log query promises
      entry.status = await Promise.all(entry.status);
      return entry;
    });

    // resolve promises
    resultGrid = await Promise.all(resultGrid);

    // console.log("habits", habits);
    console.dir(resultGrid);
    console.log(JSON.stringify(resultGrid));

    return resultGrid;
  }
}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    habit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "habit",
        key: "id",
      },
    },
    entry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "log",
  }
);

module.exports = Log;
