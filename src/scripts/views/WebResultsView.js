var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('underscore');
var template = require('../templates/WebResult.hbs');

Backbone.$ = $;

var WebResult   = require('../models/WebResult');
var ResultView = require('./WebResultView');
var WebResultCollection = require('../collections/WebResults.js');

module.exports = Backbone.View.extend({
  
  initialize: function() {
    console.log('intialized web results');
    this.collection.on('add', this.addResult, this);
    this.collection.on('reset', this.addAll, this);
  },

  addResult: function(item) {
    var result = new WebResult({
      url : item.attributes.images.standard_resolution.url
    });
    var resultView = new ResultView({ model: result});
    // resultView.model.attributes.url = ;
    this.$el.append(resultView.el);
  },

  addAll: function() {
    _.each( this.collection, function(e, i){
      this.addResult
    })
    // this.collection.forEach(this.addResult);
    console.log(this);
  },

  render: function() {
    this.addAll();
  }
  
});
