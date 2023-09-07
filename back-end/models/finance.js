const mongoose = require('mongoose');

// Схема данных для финансов
const financeSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'category',
		required: true,
	},
	money: {
		type: Number,
		required: true,
	},
	income: {
		type: Boolean,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('finance', financeSchema);
