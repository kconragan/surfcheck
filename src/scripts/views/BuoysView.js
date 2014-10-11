var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('underscore');
var template = require('../templates/WebResult.hbs');

Backbone.$ = $;

var Buoy     = require('../models/Buoy');
var BuoyView = require('../views/BuoyView');


module.exports = Backbone.View.extend({
  
  initialize: function() {
    console.log('intialized buoy results');
    this.collection.on('add', this.addResult, this);
    this.collection.on('reset', this.addAll, this);
  },

  addResult: function(item) {
    // We have to do a lot of parsing to get to the data we want
    
    // Get the readings and the name of the buoy
    var data = item.attributes.content.split('<strong>');
    var name = item.attributes.title;
    name = name.split(' ')[1];
    
    // This is messy, but for now, depending on the name config
    // of the buoy, we have to find the attributes in separate
    // places in the string. Need to write some tests to make
    // sure these don't change over time and/or look for more
    // structured source of data.
    
    var waveHeight,
        wavePeriod,
        waveDirection,
        name,
        windSpeed,
        windDirection;
    
    if (name === '46237') {
      console.log(name);
      waveHeight = data[3].split('</strong>')[1].split('<br>')[0];
      wavePeriod = data[4].split('</strong>')[1].split('<br>')[0];
      waveDirection = data[6].split('</strong>')[1].split('<br>')[0];
    }
    else {
      console.log(name);
      waveHeight = data[6].split('</strong>')[1].split('<br>')[0];
      wavePeriod = data[7].split('</strong>')[1].split('<br>')[0];
      waveDirection = data[9].split('</strong>')[1].split('<br>')[0];
    }
    
    
    console.log(item);
    var buoy = new Buoy({
      name       : name,
      waveHeight : waveHeight,
      wavePeriod : wavePeriod,
      waveDirection : waveDirection
    });
    
    var buoyView = new BuoyView({ model: buoy});
    
    // resultView.model.attributes.url = ;
    this.$el.append(buoyView.el);
  },

  addAll: function() {
    _.each( this.collection, function(e, i){
      this.addResult
    })
  },

  render: function() {
    this.addAll();
  }
  
});
