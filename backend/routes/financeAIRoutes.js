const express = require('express')
const authenticate = require('../middlewares/authMiddleware')
const { askAssistant } = require('../controllers/financeAIController')
const router = express.Router()

router.post('/ask-ai', authenticate, askAssistant)

module.exports = router