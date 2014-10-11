var Backbone = require('backbone');
var WebResult = require('../models/WebResult');

/*-----------------------------------------------------------------------------/
|  MODEL                                                                      /
----------------------------------------------------------------------------*/

var WebResults = Backbone.Collection.extend({

	model: WebResult,
	url : function() {
		return 'https://api.instagram.com/v1/media/popular?client_id=642176ece1e7445e99244cec26f4de1f&&callback=?';
	},
	
	parse : function(response, xhr) {
		console.log(response, xhr);
		return response.data;
	}

});

/*-----------------------------------------------------------------------------/
|  EXPORTS                                                                    /
----------------------------------------------------------------------------*/

module.exports = WebResults;
