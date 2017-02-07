/* jshint node: true */
'use strict';
var VendorDedupe = require('./lib/VendorDedupe');

module.exports = {
  name: 'ember-engines-dedupe-vendor',
  isEnabled: function() {
    var enabled = true;
    var _app = this.registry.app;
    while (_app.app) {
      _app = _app.app;
    }
    if (_app.options && _app.options['ember-engines-dedupe-vendor'] && _app.options['ember-engines-dedupe-vendor'].disabled) {
      enabled = false;
    }
    return enabled;
  },
  postprocessTree: function(type, tree) {
    if (type === 'all') {
      return new VendorDedupe(tree);
    }
    return tree;
  }
};
