[![Build Status](https://travis-ci.org/Cryrivers/ember-engines-dedupe-vendor.svg?branch=master)](https://travis-ci.org/Cryrivers/ember-engines-dedupe-vendor)

# ember-engines-dedupe-vendor
De-duplicate vendor files in your ember engines.

If your ember app has multiple lazy-loading engines, and they all installed some awesome addons. The addon vendor files would be duplicated and present in both `vendor.js` and `engine-vendor.js` files. This addon aims to remove all duplicated vendor modules from `engine-vendor.js` which has already been in `vendor.js`.

## Demo
You can run the dummy app in the project for demo.
- `git clone` this repository
- `npm install`
- `bower install`
- `ember server`
- Visit your app at http://localhost:4200.

### Dependencies of the dummy app
#### Main app
- liquid-fire
- ember-concurrency
- ember-composable-helpers
  - `inc` helper

#### The lazy-loading engine
- liquid-fire
- ember-concurrency
- ember-composable-helpers
  - `inc` helper
  - `dec` helper

As you can see, everything is duplicated except for `dec` helper module.

### Before using `ember-engines-dedupe-vendor`
![Before](https://raw.githubusercontent.com/Cryrivers/ember-engines-dedupe-vendor/master/misc/before.png)

### After using `ember-engines-dedupe-vendor`
![After](https://raw.githubusercontent.com/Cryrivers/ember-engines-dedupe-vendor/master/misc/after.png)

## Installation
```sh
$ ember install ember-engines-dedupe-vendor
```
and done. You don't have to setup anything. It just works.

## Compatibility
This addon is tested against the `release`, `beta` and `canary` channels. It is not tested against `lts-2.4` and `lts-2.8` channels as those versions do not support lazy-loading engines.

## Testing
```sh
$ ember test
```

```sh
$ ember test --server
```
