var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;


module.exports = Backbone.View.extend({
  tagName : 'div',
  initialize : function() {
    this.listenTo(this.model,'change', this.render); // new bind technique, to change event on the View's model
    this.model.fetch(); // fetching the model data from /my/url
  },
  
  render : function() {
    var template = require('../templates/Tide.hbs');
    this.$el.html(template(this.model.attributes))
    return this;
  }

})
