const mongoose = require('mongoose');

// Схема данных для группы
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'list',
      required: true,
    }
  ],
  totalAmount: {
    type: Number,
    default: 0,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('group', groupSchema);
