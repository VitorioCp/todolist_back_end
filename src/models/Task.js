const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statusTask: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Task;
