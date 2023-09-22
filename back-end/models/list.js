const mongoose = require('mongoose');

// Схема данных для категории финансов
const listSchema = new mongoose.Schema({
  listName: {
    type: String,
    minlength: 2,
    maxlength: 150,
    required: true,
  },
  incomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'finance',
      default: [],
    },
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'finance',
      default: [],
    },
  ],
  sum: {
    type: Number,
    default: 0,
  },
  listDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('list', listSchema);
