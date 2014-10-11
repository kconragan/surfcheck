'use strict';

var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('underscore');

var WebResult            = require('../models/WebResult');
var WebResultsView       = require('../views/WebResultsView');
var WebResultsCollection = require('../collections/WebResults');

var Buoy            = require('../models/Buoy');
var BuoysView       = require('../views/BuoysView');
var BuoyCollection  = require('../collections/BuoyCollection');

var TideReading     = require('../models/Tide');
var TideView        = require('../views/TideView');

module.exports = Backbone.Router.extend({
  routes : {
    'search' : 'index',
    'buoys'  : 'buoys',
    '*default' : 'index'
  },

  index : function() {
    console.log('routed to index');
    var self = this;
    // this.webResults = new WebResultsCollection();
    // this.webResults.render();


    this.webResults = new WebResultsCollection();
    this.webResults.fetch();
    var webResultsView = new WebResultsView({ collection: self.webResults });
    webResultsView.render();
    // //
    // webResults.render();
    // //
    $('#container').html(webResultsView.el);
  },
  
  buoys : function() {
    console.log('initialize buoy');
    
    var self = this;
    
    this.buoys = ['46012', '46237', '46026'];

    _.each(this.buoys, function( element, index){
      var buoy = new BuoyCollection([], {'id' : element});
      // this.buoys.id = 46237;
      buoy.fetch();
      var buoysView = new BuoysView({ collection: buoy });
      buoysView.render();
      $('#container').append(buoysView.el);
    })
    
    this.tide = new TideReading();
    this.tide.fetch();
    var tideView = new TideView({ model: self.tide });
    tideView.render();
    console.log('hi', tideView);
    $('#container').append(tideView.el);
  }
  
})
