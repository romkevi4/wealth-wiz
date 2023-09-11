const mongoose = require('mongoose');

// Схема данных для группы
const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'list',
      default: [],
    }
  ],
  totalSum: {
    type: Number,
    default: 0,
  },
  groupDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('group', groupSchema);
