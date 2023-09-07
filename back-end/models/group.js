const mongoose = require('mongoose');
const list = require('./list');

// Схема данных для группы
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  lists: [
    list,
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('group', groupSchema);
