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
      required: true,
    }
  ],
  totalSum: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('group', groupSchema);
