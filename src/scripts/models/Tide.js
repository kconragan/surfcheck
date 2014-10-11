var Backbone = require('backbone');

var Tide = Backbone.Model.extend({
  defaults : {
    'height' : 'NaN'
  },
  url : function() {
    return 'http://api.wunderground.com/api/667949632ad1cc70/tide/q/CA/Half_Moon_Bay.json?callback=?';
  },
  parse : function(response, xhr) {
    console.log(response.tide.tideSummary);
    var rawTideData = response.tide.tideSummary[0];
    
    var tideData = {
      height : rawTideData.data.height,
      type   : rawTideData.data.type,
      time   : rawTideData.date.pretty
    }
    console.log(tideData);
    return tideData;
  }
});

module.exports = Tide;
