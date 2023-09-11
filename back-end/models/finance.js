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
		default: 0,
		required: true,
	},
	type: {
		type: String,
		enum: ['expense', 'income'],
		default: 'expense',
		required: true,
	},
	financeDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

module.exports = mongoose.model('finance', financeSchema);
