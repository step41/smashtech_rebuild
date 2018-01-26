const functions = {
	
	formatDate: function(dateString) {
		var date = new Date(dateString);
		var d = date.getDate();
		var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
		var m = monthNames[date.getMonth()];
		var y = date.getFullYear();
		return m + ' ' + d + ', ' + y;
	},

	getCareerWrap: function(career, careerCurr, iterator) {
		let html = '';
		if (career && career.department) {
			if (career.department != careerCurr) {
				if (iterator) {
					html += '</div></div>';
				}
				html += '<div class="row job-category">';
					html += '<div class="col-md-3 col-sm-3 col-xs-12">';
						html += '<p>';
							html += '<label>' + career.department + '</label>';
						html += '</p>';
					html += '</div>';
					html += '<div class="col-md-9 col-sm-9 col-xs-12">';

			}
		}

		return html;
	},

	getDomainUrl: function(req) {
		return req.protocol + '://' + req.get('host');
	},

};

module.exports = functions;