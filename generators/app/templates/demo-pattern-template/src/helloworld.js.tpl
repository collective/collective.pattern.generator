define([
  'jquery',
  'mockup-patterns-base'
], function ($, Base) {
  'use strict';

  var <%= patternName %> = Base.extend({
    name: '<%= patternNameLower %>',
    defaults: {
      'color': 'black',
      'bgcolor': 'yellow'
    },
    init: function () {
      var $label = this.$el;
      $label.text('Hello, World!');
      $label.css({
        'color': this.options.color,
        'background': this.options.bgcolor
      });
    }
  });

  return <%= patternName %>;
});
