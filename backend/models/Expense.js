// models/Expense.js
module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define("Expense", {
      userId: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
      category: DataTypes.STRING,
      date: DataTypes.DATE,
      description: DataTypes.STRING,
    });
  
    return Expense;
  };
  