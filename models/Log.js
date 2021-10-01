const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Log extends Model {
  /**
   * Generate 2d array of dates and habits 
   * @param {*} userId
   * @param {*} clientDate
   * @param {*} days Number of days to go back (positive number)
   */
  static async getHistory(userId, clientDate, days) {
    // make sure days is a negative number
    days = 0 - Math.abs(days);

    Date.prototype.addDay = function (days) {
      const delta = days * 24 * 60 * 60 * 1000;
      let date = new Date(this.valueOf() + delta);
      return date.toISOString().slice(0, 10);
    };

    const dateList = [];
    const startDate = new Date(clientDate);
    for (let i = days; i <= 0; i++) {
      dateList.push(startDate.addDay(i));
    }

    const q = `  

    SELECT id, user_id, habit_id, entry_date, status FROM log
      WHERE entry_date >= DATE_ADD(:clientDate, INTERVAL :days DAY) and user_id = :userId
      ORDER BY entry_date DESC;
    `;

    const rawData = await sequelize.query(q, {
      replacements: { clientDate, days, userId },
    });

    console.log("rawData", rawData[0]);
    console.log("dateList", dateList);
    const result = dateList.map((dateEntry) =>
      rawData.find((row) => row[0].entry_date === dateEntry)
    );
    console.log("result", result);
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
    modelName: "Log",
  }
);

module.exports = Log;
