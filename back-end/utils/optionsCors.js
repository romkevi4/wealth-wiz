const { STATUS_CODE } = require('./responseInfo');

// Настройка опций для CORS
module.exports.optionsCors = {
  origin: [
    'http://localhost:3001',
    'localhost:3001',
  ],
  credentials: true,
  optionsSuccessStatus: STATUS_CODE.OK,
};
