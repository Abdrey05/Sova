require('dotenv').config();
const express = require('express');
const apiRouter = require('./routes/api.router');
const serverConfig = require('./config/server.config');

const app = express();

const PORT = process.env.PORT || 3000;

serverConfig(app);

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
