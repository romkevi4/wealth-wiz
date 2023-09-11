const routes = require('express').Router();

const { auth } = require('../middlewares/auth');
const { appNotFound } = require('../middlewares/appNotFound');

const regRouter = require('./registration');
const authRouter = require('./authentication');
const usersRouter = require('./users');
const moviesRouter = require('./movies'); // от movies-explorer-api

// Основные маршруты
routes
  .use(regRouter)
  .use(authRouter)
  .use(auth)
  .use(usersRouter)
  .use(moviesRouter) // от movies-explorer-api
  .use(appNotFound);

module.exports = routes;
