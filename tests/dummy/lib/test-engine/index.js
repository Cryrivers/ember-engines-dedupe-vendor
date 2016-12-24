/*jshint node:true*/
var EngineAddon = require('ember-engines/lib/engine-addon');
module.exports = EngineAddon.extend({
  name: 'test-engine',
  lazyLoading: true,
  isDevelopingAddon: function() {
    return false;
  },
  'ember-composable-helpers': {
      only: ['inc', 'dec']
  },
});
