const mongoose = require('mongoose');

// Схема данных для категории финансов
const listSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  finances: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'finance',
      required: true,
    }
  ],
  sum: {
    type: Number,
    default: 0,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('list', listSchema);
