const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const { MESSAGE } = require('../utils/responseInfo');

// Схема данных для категории финансов
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    minlength: 2,
    maxlength: 150,
    unique: true,
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
    type: [String],
    enum: ['expense', 'income'],
    validate: {
      validator(arr) {
        return arr.length > 0;
      },
      message: MESSAGE.VALIDATE_NON_EMPTY_ARRAY,
    },
    required: true,
  },
});

module.exports = mongoose.model('category', categorySchema);
