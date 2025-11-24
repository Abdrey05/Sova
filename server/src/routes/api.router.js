const apiRouter = require('express').Router();
const formatResponse = require('../utils/formatResponse');
const taskRouter = require('./task.router');
const authRouter = require('./auth.router');

apiRouter.use('/tasks', taskRouter);
apiRouter.use('/auth', authRouter);

apiRouter.use((req, res) => {
  res.status(404).json(formatResponse(404, 'Ресурс не найден'));
});

module.exports = apiRouter;
