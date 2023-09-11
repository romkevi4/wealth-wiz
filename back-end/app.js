require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes/index');

const { limiter } = require('./middlewares/rateLimit');
const { handleErrors } = require('./middlewares/handleErrors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_DB } = require('./config');
const { optionsCors } = require('./utils/optionsCors');

const app = express();

app.use('*', cors(optionsCors));

mongoose.connect(MONGO_DB);

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(helmet())
  .use(requestLogger)
  .use(limiter)
  .use(routes)
  .use(errorLogger)
  .use(errors())
  .use(handleErrors)
  .listen(PORT);
