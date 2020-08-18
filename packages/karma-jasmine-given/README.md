# `@hirez_io/karma jasmine-given` ⚒

A karma plugin for loading [@hirez_io/jasmine-given](https://github.com/hirezio/given/tree/master/packages/jasmine-given)

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