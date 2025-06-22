const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.askAssistant = async (req, res) => {
  const { question } = req.body;
  const userId = req.userId;

  try {
    const transactions = await Transaction.findAll({
      where: { UserId: userId },
      limit: 10,
      order: [['createdAt', 'DESC']],
    });

    const context = `User's last transactions: ${JSON.stringify(transactions)}`;
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a personal financial assistant for the FinTrack app. You help users by analyzing their budgets, expenses, etc. Do not reply irrevelant questions.' },
        { role: 'user', content: `${context}\n\n${question}` },
      ],
    });

    res.json({ answer: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
