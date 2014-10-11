var Backbone = require('backbone');
var Buoy = require('../models/Buoy');

/*-----------------------------------------------------------------------------/
|  MODEL                                                                      /
----------------------------------------------------------------------------*/

var BuoyCollection = Backbone.Collection.extend({

  model: Buoy,
  initialize : function(models, options) {
    console.log('initializing buoy collection');
    console.log(options);
    this.buoyID = options.id;
  },
  url : function() {
    console.log('fetching url for buoy' + this.buoyID);
    var url = 'https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://www.ndbc.noaa.gov/data/latest_obs/' + this.buoyID + '.rss&callback=?';
    return url;
  },
  
  parse : function(response, xhr) {
    return response.responseData.feed.entries[0];
  }

});

/*-----------------------------------------------------------------------------/
|  EXPORTS                                                                    /
----------------------------------------------------------------------------*/

module.exports = BuoyCollection;
