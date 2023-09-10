const mongoose = require('mongoose');

// Схема данных для группы
const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'list',
      default: [],
      required: true,
    }
  ],
  totalSum: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model('group', groupSchema);
