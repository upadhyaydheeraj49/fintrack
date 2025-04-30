const { Op } = require('sequelize');
const { Transaction, User } = require('../models');
const {sequelize} = require('../models/index');

const getAnalyticsSummary = async (req, res) => {
  try {
    const UserId = req.userId;
    const { filterType='month' } = req.query; // 'week' | 'month' | 'year'

    let startDate;
    const today = new Date();

    if (filterType === 'week') {
      startDate = new Date();
      startDate.setDate(today.getDate() - 7);
    } else if (filterType === 'month') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (filterType === 'year') {
      startDate = new Date(today.getFullYear(), 0, 1);
    } else {
      return res.status(400).json({ message: 'Invalid filter type' });
    }

    // Fetch user balance
    const tdata = await Transaction.findAll({ where: { UserId: req.userId } });
    let allSpent = 0;
    let allIncome = 0;
  
      tdata.forEach((transaction) => {
        if (transaction.type === 'expense') {
          allSpent += transaction.amount;
        } else if (transaction.type === 'income') {
          allIncome += transaction.amount;
        }
      });

    const balance = allIncome - allSpent;

    // Fetch all transactions
    const transactions = await Transaction.findAll({
      where: {
        UserId,
        date: {
          [Op.gte]: startDate,
          [Op.lte]: today,
        },
      },
    });

    // Calculate totals
    const transactionCount = transactions.length;
      let totalSpent = 0;
      let totalSavings = 0;
  
      transactions.forEach((transaction) => {
        if (transaction.type === 'expense') {
          totalSpent += transaction.amount;
        } else if (transaction.type === 'income') {
          totalSavings += transaction.amount;
        }
      });

    // Calculate spend per type income/expense
    const categorySpend = {};
    transactions.forEach(txn => {
      if (txn.type === 'expense') {
        categorySpend[txn.category] = (categorySpend[txn.category] || 0) + txn.amount;
      }
    });

    const topCategories = Object.keys(categorySpend)
      .map(category => ({
        name: category,
        amount: categorySpend[category]
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    // Prepare monthly costs
    const monthWiseReceived = new Array(12).fill(0);
    const monthWiseExpenses = new Array(12).fill(0);

    transactions.forEach(txn => {
      const month = new Date(txn.date).getMonth(); // 0-11
      if (txn.type === 'income') {
        monthWiseReceived[month] += txn.amount;
      } else if (txn.type === 'expense') {
        monthWiseExpenses[month] += txn.amount;
      }
    });

    res.json({
      balance,
      transactionCount,
      totalSpent,
      totalSavings,
      categorySpend,
      topCategories,
      costs: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          { label: 'Received', data: monthWiseReceived },
          { label: 'Expenses', data: monthWiseExpenses }
        ]
      }
    });

  } catch (error) {
    console.error('Error in getAnalyticsSummary:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getMonthlyTransactionCount = async (req, res) => {
  try {
    const result = await Transaction.findAll({
      attributes: [
        [sequelize.fn('TO_CHAR', sequelize.col('createdAt'), 'YYYY-MM'), 'monthYear'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: [sequelize.fn('TO_CHAR', sequelize.col('createdAt'), 'YYYY-MM')],
      where: { UserId: req.userId },
      order: [[sequelize.fn('TO_CHAR', sequelize.col('createdAt'), 'YYYY-MM'), 'ASC']]
    });

    // Format the response to send month names instead of raw 'YYYY-MM' if you want
    const formattedData = result.map(item => {
      const [year, month] = item.dataValues.monthYear.split('-');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return {
        month: `${monthNames[parseInt(month, 10) - 1]}`,
        count: parseInt(item.dataValues.count, 10)
      };
    });

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getCategoryDistribution = async (req, res) => {
  const result = await Transaction.findAll({
    attributes: [
      'category',
      [sequelize.fn('SUM', sequelize.col('amount')), 'value']
    ],
    group: ['category'],
    where: { UserId: req.userId }
  });
  res.json(result);
};

module.exports = {
  getAnalyticsSummary,
  getMonthlyTransactionCount,
  getCategoryDistribution
};
