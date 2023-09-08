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
		default: 0,
	},
	type: {
		type: String,
		enum: ['expense', 'income'],
		required: true,
		default: 'expense',
	},
	financeDate: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('finance', financeSchema);
