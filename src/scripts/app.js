var $        = require('jquery');
var Backbone = require('backbone');
var _        = require('underscore');
Backbone.$    = $;


var WebResult            = require('./models/WebResult');
var WebResultsView       = require('./views/WebResultsView');
var WebResultsCollection = require('./collections/WebResults');
var WebResultsRouter     = require('./routers/WebResultsRouter');

//
//
// var webResults = new WebResultsCollection();
// var resultsView = new WebResultsView({ collection: webResults });
// resultsView.render();
// webResults.fetch({
//   success: function() {
//     console.log('hi there');
//     console.log(webResults);
//     $('#container').append(resultsView.models);
//   },
//   error : function(e) {
//     console.log(e);
//   }
// })

var webResultsRouter = new WebResultsRouter();
console.log('router started');

Backbone.history.start()
