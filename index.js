const port = 80;
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const functions = require('./config/functions');

// Connect to DB
mongoose.connect('mongodb://localhost/smashtech');
let db = mongoose.connection;
db.on('connected', function() {
	console.log('Connected successfully to MongoDB');
}).on('error', function(err) {
	console.log('The following error occurred connecting to MongoDB: ' + err);
}).on('disconnected', function() {
	console.log('Disconnected from MongoDB');
});


// Init App
const app = express();

// Import DB Models
let Article = require('./models/article');
let Career = require('./models/career');
let CareerQuote = require('./models/careerquote');

// Set View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Default Vars
let companyName = 'Smashtech';
let pageTitle = 'Smashtech Rebuild Demo';
let pageDesc = 'We build meaningful brands that make living a healthy lifestyle, simple.';
let pageDescLong = 'A creative team of individuals determined to make a difference. We build meaningful brands that make living a healthy lifestyle simple.';
var domainUrl = ''; // Need to determine how to access this without going through an Express route request

// Home Route
app.get('/', (req, res) => {
	console.log('Loading home route now...');
	res.render('home', {
		pugPageTitle: pageTitle,
		pugPageDesc: pageDesc,
		pugPageDescLong: pageDescLong,
		pugHeaderTitle: '',
		pugDomainUrl: functions.getDomainUrl(req)
	});

});

// Downloads Route
app.get('/downloads/:filename', (req, res) => {
	console.log('Loading downloads route now...');
	let file = __dirname + '/downloads/' + req.params.filename;
	res.download(file);
});

// Contact Route
app.get('/contact', (req, res) => {
	console.log('Loading contact route now...');
	res.render('contact', {
		pugPageTitle: pageTitle,
		pugPageDesc: pageDesc,
		pugPageDescLong: pageDescLong,
		pugHeaderTitle: '',
		pugDomainUrl: functions.getDomainUrl(req)
	});

});

// Careers Route
app.get('/careers', (req, res) => {
	console.log('Loading careers route now...');
	Career.find({}).sort({ "order": "asc" }).exec(function(err, careers) {
		if (err) {
			console.log(err);
		}
		else {
			CareerQuote.find({}).sort({ "order": "asc" }).exec(function(err, careerQuotes) {
				if (err) {
					console.log(err);
				}
				else {
					res.render('careers', {
						pugPageTitle: 'Smashtech Careers',
						pugPageDesc: pageDesc,
						pugPageDescLong: pageDescLong,
						pugHeaderTitle: '',
						pugDomainUrl: functions.getDomainUrl(req),
						pugCareers: careers,
						pugCareerDepartment: '',
						pugCareerQuotes: careerQuotes,
						pugGetCareerWrap: functions.getCareerWrap
					});
				}
			});
		}
	});
});

// Company Route
app.get('/company', (req, res) => {
	console.log('Loading company route now...');
	res.render('company', {
		pugPageTitle: 'Smashtech Story',
		pugPageDesc: pageDesc,
		pugPageDescLong: pageDescLong,
		pugHeaderTitle: '',
		pugDomainUrl: functions.getDomainUrl(req)
	});
});

// News Route
app.get('/news', (req, res) => {
	console.log('Loading news route now...');
	Article.find({}).sort({ "date_pub": "desc" }).exec(function(err, articles) {
		if (err) {
			console.log(err);
		}
		else {
			res.render('news', {
				pugPageTitle: 'Smashtech News',
				pugPageDesc: pageDesc,
				pugPageDescLong: pageDescLong,
				pugHeaderTitle: 'News',
				pugDomainUrl: functions.getDomainUrl(req),
				pugArticles: articles,
				pugFormatDate: functions.formatDate
			});
		}
	});
});

// Article Route
app.get('/news/:slug/', (req, res) => {
	console.log('Loading article route now...');
	Article.find({}).sort({ "date_pub": "desc" }).exec(function(err, articles) {
		Article.findOne({ "slug": req.params.slug }, function(err, article) {
			if (err) {
				console.log(err);
			}
			else {
				res.render('article', {
					pugPageTitle: article.title + ' - Smashtech',
					pugPageDesc: pageDesc,
					pugPageDescLong: pageDescLong,
					pugHeaderTitle: article.title,
					pugDomainUrl: functions.getDomainUrl(req),
					pugArticle: article,
					pugArticles: articles,
					pugFormatDate: functions.formatDate
				});
			}
		});
	});

});

// Start Server
app.listen(port, () => {
	console.log('Server started on port: ' + port);
});
