let mongoose = require('mongoose');

// Article Schema
let articleSchema = mongoose.Schema({
	author: {
		type: String
	},
	date_pub: {
		type: Date,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
});

let Article = module.exports = mongoose.model('Article', articleSchema);
