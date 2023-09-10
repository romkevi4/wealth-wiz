const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const { MESSAGE } = require('../utils/responseInfo');

// Схема данных для категории финансов
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    minlength: 2,
    maxlength: 50,
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
  type: {
    type: String,
    enum: ['expense', 'income'],
    required: true,
  },
});

module.exports = mongoose.model('category', categorySchema);
