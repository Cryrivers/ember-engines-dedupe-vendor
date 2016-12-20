[![Build Status](https://travis-ci.org/Cryrivers/ember-engines-dedupe-vendor.svg?branch=master)](https://travis-ci.org/Cryrivers/ember-engines-dedupe-vendor)

# ember-engines-dedupe-vendor
De-duplicate vendor files in your ember engines.

If your ember app has multiple lazy-loading engines, and they all installed some awesome addons. The addon vendor files would be duplicated and present in both `vendor.js` and `engine-vendor.js` files. This addon aims to remove all duplicated vendor modules in `engine-vendors.js` which has already been in `vendor.js`.

# Demo
You can check out the dummy app in the project for demo.

## Dependencies of the dummy app
### dummy - main app
- liquid-fire
- ember-concurrency
- ember-composable-helpers
  - `inc` helper

### test-engine - the lazy-loading engine
- liquid-fire
- ember-concurrency
- ember-composable-helpers
  - `inc` helper
  - `dec` helper

As you can see, everything is duplicated except for `dec` helper module.

## Before using `ember-engines-dedupe-vendor`
## After using `ember-engines-dedupe-vendor`

# Installation
```
ember install ember-engines-dedupe-vendor
```

# Setup
You do not need to setup anything. It just works.

# More information
TODO: Finish this part
