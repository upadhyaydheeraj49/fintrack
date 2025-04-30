const { Op } = require('sequelize');
const moment = require('moment');
const db = require('../models');
const Budget = db.Budget;

exports.getBudgets = async (req, res) => {
  const { filterType='month' } = req.query; // week, month, year
  const userId = req.userId;

  try {
    let whereCondition = { userId };

    if (filterType === 'week') {
      const startOfWeek = moment().startOf('isoWeek').toDate(); // Monday as start
      const endOfWeek = moment().endOf('isoWeek').toDate();

      whereCondition.createdAt = {
        [Op.between]: [startOfWeek, endOfWeek],
      };

    } else if (filterType === 'month') {
      const startOfMonth = moment().startOf('month').toDate();
      const endOfMonth = moment().endOf('month').toDate();

      whereCondition.createdAt = {
        [Op.between]: [startOfMonth, endOfMonth],
      };

    } else if (filterType === 'year') {
      const startOfYear = moment().startOf('year').toDate();
      const endOfYear = moment().endOf('year').toDate();

      whereCondition.createdAt = {
        [Op.between]: [startOfYear, endOfYear],
      };
    }

    const budgets = await Budget.findAll({ where: whereCondition });

    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBudget = async (req, res) => {
  try {
    const { amount, category, month, year } = req.body;
    const budget = await Budget.create({ amount, category, month, year, userId: req.userId });
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBudget = async (req, res) => {
  try {
    const id = req.params.id;
    const { amount, category, month, year } = req.body;
    await Budget.update({ amount, category, month, year }, { where: { id, userId: req.userId } });
    res.json({ message: 'Budget updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const id = req.params.id;
    await Budget.destroy({ where: { id, userId: req.userId } });
    res.json({ message: 'Budget deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
