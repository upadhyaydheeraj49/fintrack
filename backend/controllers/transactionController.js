const db = require('../models');
const Transaction = db.Transaction;

exports.getAll = async (req, res) => {
  try {
    const data = await Transaction.findAll({ where: { UserId: req.userId}, order: [['createdAt', 'DESC']] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, amount, type, date, category } = req.body;
    const transaction = await Transaction.create({ title, amount, type, date, category, UserId: req.userId });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, amount, type, date, category } = req.body;
    await Transaction.update({ title, amount, type, date, category }, { where: { id, UserId: req.userId } });
    res.json({ message: 'Transaction updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    await Transaction.destroy({ where: { id, UserId: req.userId } });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
