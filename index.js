require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.get('/api/sync', async (req, res) => {
  try {
    const response = await fetch('https://ha-backend-psi.vercel.app/api/cron/airalo-sync-packages', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.CRON_SECRET}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    console.log('Sync Result:', result);
    res.json(result);
  } catch (error) {
    console.error('Sync Error:', error);
    res.status(500).json({ error: 'Failed to sync packages', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
