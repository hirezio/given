# `@hirez_io/karma jasmine-given` ⚒

A karma plugin for loading [@hirez_io/jasmine-given](https://github.com/hirezio/given/tree/master/packages/jasmine-given)

[![npm version](https://img.shields.io/npm/v/@hirez_io/karma-jasmine-given.svg?style=flat-square)](https://www.npmjs.org/package/@hirez_io/karma-jasmine-given)
[![npm downloads](https://img.shields.io/npm/dm/@hirez_io/karma-jasmine-given.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@hirez_io/karma-jasmine-given&from=2017-07-26)
[![codecov](https://img.shields.io/codecov/c/github/hirezio/given.svg)](https://codecov.io/gh/hirezio/given)
![Build and optionally publish](https://github.com/hirezio/given/workflows/Build%20and%20optionally%20publish/badge.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](code_of_conduct.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

<div align="center">
  <a href="https://learn.hirez.io/?utm_source=github&utm_medium=link&utm_campaign=jasmine-given">
    <img src="../../for-readme/test-angular.jpg"
      alt="TestAngular.com - Free Angular Testing Workshop - The Roadmap to Angular Testing Mastery"
      width="600"
    />
  </a>
</div>

## Installation

```
yarn add -D @hirez_io/karma-jasmine-given
```

or

```
npm install -D @hirez_io/karma-jasmine-given
```

This plugin was inspired by [karma-jasmine-given](https://github.com/kirisu/karma-jasmine-given)) which loads the original "jasmine-given".

I rewrote it to save you the hassle of loading @hirez_io/jasmine-given's script files yourself. 😎

## Configuration

Here's how to modify your `karma.conf.js`:

```js
module.exports = function(config) {
  config.set({

    plugins: [
      require('karma-jasmine'),
      require('@hirez_io/karma-jasmine-given'), // <-- ADD THIS
      require('karma-chrome-launcher')
      // other plugins you might have...
    ],

    frameworks: [
      '@hirez_io/jasmine-given', // <-- ADD THIS
      'jasmine',
      // other frameworks...
    ],

    // ...
```

Want to contribute? Yayy! 🎉

Please read and follow our [Contributing Guidelines](../../CONTRIBUTING.md) to learn what are the right steps to take before contributing your time, effort and code.

Thanks 🙏

## Code Of Conduct

Be kind to each other and please read our [code of conduct](../../CODE_OF_CONDUCT.md).

## License

MIT
