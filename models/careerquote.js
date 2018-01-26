let mongoose = require('mongoose');

// Career Quote Schema
let careerQuoteSchema = mongoose.Schema({
	name_full: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	quote: {
		type: String,
		required: true
	},
	order: {
		type: Number,
		required: true
	}
});

let CareerQuote = module.exports = mongoose.model('CareerQuote', careerQuoteSchema);