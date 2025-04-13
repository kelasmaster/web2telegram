const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/send-to-telegram', async (req, res) => {
  const { chatId, message } = req.body;
  
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: message
      }
    );
    
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
