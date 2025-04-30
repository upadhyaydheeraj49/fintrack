const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const { getAnalyticsSummary, getMonthlyTransactionCount, getCategoryDistribution } = require('../controllers/analyticsController');

router.get('/summary', authenticate, getAnalyticsSummary);
router.get('/monthly-count', authenticate, getMonthlyTransactionCount)
router.get('/category-distribution', authenticate, getCategoryDistribution)

module.exports = router;
