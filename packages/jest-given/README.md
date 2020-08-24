# `@hirez_io/jest-given` 📃👌

A jest addon that helps you clean up your microtests by breaking them into a **"Given / When / Then"** structure.

[![npm version](https://img.shields.io/npm/v/@hirez_io/jest-given.svg?style=flat-square)](https://www.npmjs.org/package/@hirez_io/jest-given)
[![npm downloads](https://img.shields.io/npm/dm/@hirez_io/jest-given.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@hirez_io/jest-given&from=2017-07-26)
[![codecov](https://img.shields.io/codecov/c/github/hirezio/given.svg)](https://codecov.io/gh/hirezio/given)
![Build and optionally publish](https://github.com/hirezio/given/workflows/Build%20and%20optionally%20publish/badge.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](code_of_conduct.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Installation

```
yarn add -D @hirez_io/jest-given
```

or

```
npm install -D @hirez_io/jest-given
```

### Using TypeScript?

You should add `@hirez_io/jest-given` to your `types` property in your `tsconfig.json` (or `tsconfig.spec.json`) like this:

```js
// tsconfig.json or tsconfig.spec.json

{
  ...
  "types": [
      "jest",
      "@hirez_io/jest-given", // <-- ADD THIS

      // ...any other types you might have...
    ],
  ...
}
```

## Prior Art + Credit

This library is a port of [`@hirez_io/jasmine-given`](https://github.com/hirezio/given/tree/master/packages/jasmine-given) which is a rewrite of the original [jasmine-given](https://github.com/searls/jasmine-given) library by Justin Searls who've done an amazing job with it.

#### So why a rewrite and how is it different?

[Everything is explained here](https://github.com/hirezio/given/tree/master/packages/jasmine-given#prior-art--credit) 😀

## Why choose this over plain `beforeEach` and `it()` functions?

### ✅ **Cleaner structure:**

Helps you break down tests into the natural "Arrange, Act, Assert" model via "Given When and Then" and by that enforces a "microtest" structure.

```ts
describe('MyComponent', () => {
  let firstNum;
  let actualResult;

  // THIS IS EXACTLY LIKE A `beforeEach`
  // It's where you setup your code / inputs
  Given(() => {
    firstNum = 1;
  });

  // THIS IS A SPECIAL TYPE OF `beforeEach`
  // It's where you call the action under test
  When(() => {
    actualResult = addTwo(firstNum);
  });

  // THIS IS EXACTLY LIKE A `it()`
  // It's where you expect the desired outcome
  Then(() => {
    expect(actualResult).toEqual(3);
  });

  // You can also add a message
  Then('it should be equal to 3', () => {
    expect(actualResult).toEqual(3);
  });
});
```

#### It even supports `done` and `async` / `await` -

```ts
describe('MyComponent', () => {
  let firstNum;
  let actualResult;

  // Supports "done"
  Given((done) => {
    firstNum = 1;
    done();
    // you can also use done(err) or done.fail(err) if you need to
  });

  // Supports "async/await"
  When(async () => {
    actualResult = await addTwo(firstNum);
  });

  Then(() => {
    expect(actualResult).toEqual(3);
  });
});
```

### ✅ **Reusability:**

By being able to extract the action (`When`) outside the `Given` & `Then` pairs, you are able to reuse the same action and save the same repetitive code.

```ts
describe('MyComponent', () => {

  let firstNum;
  let actualResult;

  // Although the "When" is defined before the "Given"
  // it will run between each "Given" and "Then"
  // So it's like a "beforeEach" with special powers
  When(() => {
    console.log('WHEN');
    actualResult = addTwo(firstNum);
  })

  describe('GIVEN initial number is 1 THEN the result should be 3', () => {

    Given(() => {
      console.log('GIVEN #1');
      firstNum = 1;
    })

    Then(() => {
      console.log('THEN #1');
      expect(actualResult).toEqual(3);

    })
  })

  describe('GIVEN initial number is 18 THEN the result should be 20', () => {

    Given(() => {
      console.log('GIVEN #2');
      firstNum = 18;
    })

    Then(() => {
      console.log('THEN #2');
      expect(actualResult).toEqual(20);

    })
  })

})



CONSOLE OUTPUT:
--------------

GIVEN #1
WHEN
THEN #1

GIVEN #2
WHEN
THEN #2


```

### ✅ **Better test description:**

The message for `it("should do something", ...)` focus specifically on the "outcome" (`Then`), but moving the description of the test into the `describe` gives you a chance to write a more descriptive test description.

(as seen above)

## Contributing

Want to contribute? Yayy! 🎉

Please read and follow our [Contributing Guidelines](../../CONTRIBUTING.md) to learn what are the right steps to take before contributing your time, effort and code.

Thanks 🙏

## Code Of Conduct

Be kind to each other and please read our [code of conduct](../../CODE_OF_CONDUCT.md).

## License

MIT

## Want to learn more?

<div align="center">
  <a href="https://learn.hirez.io/?utm_source=github&utm_medium=link&utm_campaign=jest-given">
    <img src="../../for-readme/test-angular.jpg"
      alt="TestAngular.com - Free Angular Testing Workshop - The Roadmap to Angular Testing Mastery"
      width="600"
    />
  </a>
</div>
