const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', authenticate, transactionController.getAll);
router.post('/', authenticate, transactionController.create);
router.put('/:id', authenticate, transactionController.update);
router.delete('/:id', authenticate, transactionController.remove);

module.exports = router;
