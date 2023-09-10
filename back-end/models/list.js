const mongoose = require('mongoose');

// Схема данных для категории финансов
const listSchema = new mongoose.Schema({
  listName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  incomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'finance',
      default: [],
      required: true,
    },
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'finance',
      default: [],
      required: true,
    },
  ],
  sum: {
    type: Number,
    default: 0,
    required: true,
  },
  listDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('list', listSchema);
