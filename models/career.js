let mongoose = require('mongoose');

// Career Schema
let careerSchema = mongoose.Schema({
	department: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	app_url: {
		type: String,
		required: true
	},
	order: {
		type: Number,
		required: true
	}
});

let Career = module.exports = mongoose.model('Career', careerSchema);