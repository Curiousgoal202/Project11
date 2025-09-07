const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send({
    message: 'Hello from Rupali',
    version: process.env.APP_VERSION || '1.0.0',
    host: os.hostname()
  });
});

app.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
