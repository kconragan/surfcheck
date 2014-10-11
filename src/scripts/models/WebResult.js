var Backbone = require('backbone');
/*
*
 */
var WebResult = Backbone.Model.extend({
    defaults: {
      title   : 'I am a title',
      snippet : 'Lorem ipsum dolor',
      vizurl  : 'www.google.com',
      url     : 'http://placehold.it/350x150'
    }
});

module.exports = WebResult;
