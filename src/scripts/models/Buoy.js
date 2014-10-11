var Backbone = require('backbone');

var Buoy = Backbone.Model.extend({
  defaults : {
    'waveHeight' : '5ft'
  }
});

module.exports = Buoy;
