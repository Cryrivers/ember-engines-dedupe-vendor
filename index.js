/* jshint node: true */
'use strict';
var VendorDedupe = require('./lib/VendorDedupe');

module.exports = {
  name: 'ember-engines-dedupe-vendor',
  isDevelopingAddon: function() {
    return true;
  },
  postprocessTree: function(type, tree) {
    if (type === 'all') {
      return new VendorDedupe(tree);
    } 
    return tree;
  }
};
