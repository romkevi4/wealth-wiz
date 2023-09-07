const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const { MESSAGE } = require('../utils/responseInfo');

// Схема данных для категории расхода или дохода
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  icon: {
    type: String,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: MESSAGE.URL_INCORRECT,
    },
    required: true,
  },
  expenseCategoryId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('category', categorySchema);
