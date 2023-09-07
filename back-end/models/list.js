const mongoose = require('mongoose');
const finance = require('./finance');

// Схема данных для категории финансов
const listSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  finances: [
    finance,
  ],
  sum: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('list', listSchema);
