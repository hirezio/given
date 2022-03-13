# `@hirez_io/karma jasmine-given` ⚒

A karma plugin for loading [@hirez_io/jasmine-given](https://github.com/hirezio/given/tree/master/packages/jasmine-given)

[![npm version](https://img.shields.io/npm/v/@hirez_io/karma-jasmine-given.svg?style=flat-square)](https://www.npmjs.org/package/@hirez_io/karma-jasmine-given)
[![npm downloads](https://img.shields.io/npm/dm/@hirez_io/karma-jasmine-given.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@hirez_io/karma-jasmine-given&from=2017-07-26)
![Build and optionally publish](https://github.com/hirezio/given/workflows/Build%20and%20optionally%20publish/badge.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](../../CODE_OF_CONDUCT.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-green.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

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
// karma.conf.js

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.hirez.io/?utm_medium=Open_Source&utm_source=Github&utm_campaign=Lead_Generation&utm_content=jest-given--all-contributors-profile-link"><img src="https://avatars1.githubusercontent.com/u/1430726?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shai Reznik</b></sub></a><br /><a href="https://github.com/hirezio/given/commits?author=shairez" title="Code">💻</a> <a href="https://github.com/hirezio/given/commits?author=shairez" title="Documentation">📖</a> <a href="#ideas-shairez" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-shairez" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-shairez" title="Maintenance">🚧</a> <a href="#mentoring-shairez" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/hirezio/given/pulls?q=is%3Apr+reviewed-by%3Ashairez" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/hirezio/given/commits?author=shairez" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT
