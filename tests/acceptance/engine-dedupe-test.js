/* globals require:false */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Engine Vendor Deduplication');

test('visiting main app', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('requiring `dummy/components/liquid-container` should return something', function(assert) {
  assert.notEqual(require('dummy/components/liquid-container'), null);
});

test('requiring `inc` helper should return the actual helper', function(assert) {
  assert.notEqual(require('ember-composable-helpers/helpers/inc'), null);
});

test('requiring `dec` helper should throw `missingModule` error before the engine is loaded', function(assert) {
  assert.throws(function() {
    require('ember-composable-helpers/helpers/dec');
  }, /Could not find module/);
});

test('engine-vendor.js should only contain module `ember-composable-helpers/helpers/dec`', function(assert) {
  assert.expect(2);
  var done = assert.async();
  var defineLookupRegex = /define\(['"]([a-zA-Z0-9/-]+)['"]/gm;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/engines-dist/test-engine/assets/engine-vendor.js');
  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState === 4) {
      var scriptContent = xhr.responseText;
      var parseResult = defineLookupRegex.exec(scriptContent);
      assert.equal(parseResult.length, 2, 'engine-vendor.js should only have 1 module');
      assert.equal(parseResult[1], 'ember-composable-helpers/helpers/dec', 'the only module in engine-vendor.js should be `ember-composable-helpers/helpers/dec`');
      done();
    }
  };
  xhr.send();
});

test('visiting engine app', function(assert) {
  visit('/engine');

  andThen(function() {
    assert.equal(currentURL(), '/engine');
  });
});

test('requiring `dec` helper should return the actual after the engine is loaded', function(assert) {
  assert.notEqual(require('ember-composable-helpers/helpers/dec'), null);
});

test('requiring `test-engine/components/liquid-container` should return something after the engine is loaded', function(assert) {
  assert.notEqual(require('test-engine/components/liquid-container'), null);
});
