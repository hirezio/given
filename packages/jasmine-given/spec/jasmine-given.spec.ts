import {
  NO_SPEC_FUNCTION_ERROR,
  NO_STACK_ERROR,
  CONTEXT_FOR_GWT_ERROR,
} from '../../../shared/given-core/given-core.ts';

const root = (0, eval)('this');

describe('Jasmine Given', () => {
  let fakeNumber: number | undefined;
  let actualResult: any;

  function addTwo(num: number | undefined) {
    if (num) {
      return num + 2;
    }
    return undefined;
  }

  Given(() => {
    fakeNumber = undefined;
    actualResult = undefined;
  });

  describe('should run "Given" before "When" and "When" before "Then"', () => {
    Given(() => {
      fakeNumber = 2;
    });

    When(() => {
      actualResult = addTwo(fakeNumber);
    });

    Then(() => {
      expect(actualResult).toBe(4);
    });
  });

  describe('should run the "When" after the "Given" even if declared in reverse', () => {
    When(() => {
      actualResult = addTwo(fakeNumber);
    });

    Given(() => {
      fakeNumber = 2;
    });

    Then(() => {
      expect(actualResult).toBe(4);
    });
  });

  describe('should run the "When" after the "Given" even if nested', () => {
    When(() => {
      actualResult = addTwo(fakeNumber);
    });

    describe('even if nested', () => {
      Given(() => {
        fakeNumber = 2;
      });

      Then(() => {
        expect(actualResult).toBe(4);
      });
    });
  });

  describe('should run more than one "When" after the "Given"', () => {
    When(() => {
      fakeNumber = 10;
    });

    When(() => {
      actualResult = addTwo(fakeNumber);
    });

    describe('even if nested', () => {
      Given(() => {
        fakeNumber = 3;
      });

      Then(() => {
        expect(actualResult).toBe(12);
      });
    });
  });

  describe('should handle done function in "Given"', () => {
    Given((done) => {
      fakeNumber = 2;
      done();
    });

    When(() => {
      actualResult = addTwo(fakeNumber);
    });

    Then(() => {
      expect(actualResult).toBe(4);
    });
  });

  describe('should support done function in "When"', () => {
    When((done) => {
      actualResult = addTwo(2);
      done();
    });

    Then(() => {
      expect(actualResult).toBe(4);
    });
  });

  describe('should support done function in "Then"', () => {
    Then((done) => {
      expect(true).toBe(true);
      done();
    });
  });

  describe('should handle async await in "Given"', () => {
    Given(async () => {
      fakeNumber = await Promise.resolve(1);
    });

    Given(async () => {
      fakeNumber = await Promise.resolve(2);
    });

    When(() => {
      actualResult = addTwo(fakeNumber);
    });

    Then(() => {
      expect(actualResult).toBe(4);
    });
  });

  describe('should handle async await in "When"', () => {
    When(async () => {
      fakeNumber = await Promise.resolve(1);
    });

    When(async () => {
      fakeNumber = await Promise.resolve(2);
      actualResult = addTwo(fakeNumber);
    });

    Then(() => {
      expect(actualResult).toBe(4);
    });
  });

  describe('should handle async await in "Then"', () => {
    When(() => {
      actualResult = addTwo(2);
    });

    Then(async () => {
      const expectedResult = await Promise.resolve(4);
      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('Then() should pass an empty string to it() given no label', () => {
    it('should not add the label', () => {
      spyOn(root, 'it');
      Then(() => {});
      const actualLabel = (it as jasmine.Spy).calls.first().args[0];
      expect(actualLabel).toBe('');
    });
  });

  describe('Then() should be able to have a label', () => {
    it('should add the label', () => {
      spyOn(root, 'it');
      Then('FAKE LABEL', () => {});
      const actualLabel = (it as jasmine.Spy).calls.first().args[0];
      expect(actualLabel).toBe('\n   -> Then FAKE LABEL');
    });
  });

  describe('Then() is called with only a label', () => {
    it('should throw when called', () => {
      function errorThrowingCall() {
        (Then as any)('FAKE MESSAGE');
      }
      expect(errorThrowingCall).toThrowError(NO_SPEC_FUNCTION_ERROR);
    });
  });

  describe('should share "this" context', () => {
    Given(function () {
      this.fakeInitialNumber = 2;
      this.expectedResult = 4;
    });

    When(function () {
      actualResult = addTwo(this.fakeInitialNumber);
    });

    Then(function () {
      expect(actualResult).toEqual(this.expectedResult);
    });
  });

  describe('if error is thrown in the "Given" should show a meaningful message', () => {
    const FAKE_ERROR = 'FAKE ERROR';
    let actualPromiseFromGiven: Promise<any>;

    beforeEach(() => {
      spyOn(root, 'beforeEach').and.callFake((fn: Function) => {
        actualPromiseFromGiven = fn();
      });
    });

    it('should work with a regular callback', async () => {
      Given(() => {
        throw new Error(FAKE_ERROR);
      });
      try {
        await actualPromiseFromGiven;
      } catch (err: any) {
        expect(err.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Given():`);
        expect(err.message).toContain(FAKE_ERROR);
      }
    });

    it('should work with a done callback', async () => {
      Given((done) => {
        throw new Error(FAKE_ERROR);
      });
      try {
        await actualPromiseFromGiven;
      } catch (err: any) {
        expect(err.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Given():`);
        expect(err.message).toContain(FAKE_ERROR);
      }
    });

    it('should work with a done callback with passed error', async () => {
      Given((done) => {
        done(new Error(FAKE_ERROR));
      });
      try {
        await actualPromiseFromGiven;
      } catch (err: any) {
        expect(err.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Given():`);
        expect(err.message).toContain(FAKE_ERROR);
      }
    });

    it('should work with a done callback with passed error via done.fail()', async () => {
      Given((done) => {
        done.fail(new Error(FAKE_ERROR));
      });
      try {
        await actualPromiseFromGiven;
      } catch (err: any) {
        expect(err.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Given():`);
        expect(err.message).toContain(FAKE_ERROR);
      }
    });

    it('should work with an async callback', async () => {
      Given(async () => {
        throw new Error(FAKE_ERROR);
      });

      try {
        await actualPromiseFromGiven;
      } catch (err: any) {
        expect(err.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Given():`);
        expect(err.message).toContain(FAKE_ERROR);
      }
    });
  });

  describe('if an error gets thrown in "When" or "Then"', () => {
    let afterEachCache: Function[];
    let actualError: any;
    let actualPromiseReturnedFromIt: Promise<any>;

    const FAKE_ERROR_MESSAGE = 'FAKE ERROR';

    beforeEach(() => {
      actualError = undefined;
      afterEachCache = [];

      // make beforeEach run immediately when called inside the next "it" function
      spyOn(root, 'beforeEach').and.callFake((fn: Function) => fn());

      // queues up afterEach functions for cleanup purposes inside the next "it" function
      spyOn(root, 'afterEach').and.callFake((fn: Function) => afterEachCache.push(fn));

      // Because jasmine queues up these function,
      // the following line will get called after all the "it" functions in this spec file will get called
      // The purpose is to enable us to run "it()" immediately inside of another "it callback"
      // which otherwise throws an error...
      spyOn(root, 'it').and.callFake((desc: string, fn: Function) => {
        actualPromiseReturnedFromIt = fn();
      });
    });

    it('should show a meaningful message if it was thrown in "When"', async () => {
      // without a "done"
      When(() => {
        throw new Error(FAKE_ERROR_MESSAGE);
      });
      // We must call "Then" or else the logic of "When" won't be called
      Then(() => {});

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });

    it('should show a meaningful message if it was thrown in "When" with a "done"', async () => {
      // WITH a "done"
      When((done) => {
        throw new Error(FAKE_ERROR_MESSAGE);
      });
      // We must call "Then" or else the logic of "When" won't be called
      Then(() => {});

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });

    it(`should show a meaningful message ONLY ONCE 
       if thrown in "When" with a "done"
       after multiple "When's with "done"s`, async () => {
      When((done) => {
        done();
      });

      When((done) => {
        done();
      });

      When((done) => {
        throw new Error(FAKE_ERROR_MESSAGE);
      });
      // We must call "Then" or else the logic of "When" won't be called
      Then(() => {});

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      const howManyTimesTheContextMessageAppears = actualError.message.match(
        /An error was thrown in When\(\):/gm
      ).length;

      expect(howManyTimesTheContextMessageAppears).toBe(1);
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });

    it(`should show a meaningful message if it was thrown in "When" with a "done"
        passed as a parameter`, async () => {
      // WITH a "done"
      When((done) => {
        done(new Error(FAKE_ERROR_MESSAGE));
      });
      Then(() => {});

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });

    it(`should show a meaningful message if it was thrown in "When" with a "done"
        passed via done.fail()`, async () => {
      // WITH a "done"
      When((done) => {
        done.fail(new Error(FAKE_ERROR_MESSAGE));
      });
      // We must call "Then" or else the logic of "When" won't be called
      Then(() => {});

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });

    it('should show a meaningful message if thrown as ERROR OBJECT in async "When"', async () => {
      When(() => {});
      When(async () => {
        throw new Error(FAKE_ERROR_MESSAGE);
      });
      // We must call "Then" or else the logic of "When" won't be called
      Then(() => {});

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });

    it('should show a meaningful message if thrown as STRING in async "When"', async () => {
      When(async () => {
        throw FAKE_ERROR_MESSAGE;
      });
      // We must call "Then" or else the logic of "When" won't be called
      Then(() => {});

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
      expect(actualError.message).toContain(NO_STACK_ERROR);
    });

    it('should show the original Message and Stack trace', async () => {
      let errStack = '';
      const errMessage = 'original_message';

      When(async () => {
        const err = new Error();
        errStack = err.stack || '';
        err.message = errMessage;

        throw err;
      });
      // We must call "Then" or else the logic of "When" won't be called
      Then(() => {});

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }
      console.log('actualError', actualError);
      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
      expect(actualError.message).toContain(errMessage);
      expect(actualError.stack).toContain(errStack);
    });

    it('should show a meaningful message if thrown as Object without stack in async "When"', async () => {
      When(async () => {
        throw { message: FAKE_ERROR_MESSAGE };
      });
      // We must call "Then" or else the logic of "When" won't be called
      Then(() => {});

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} When():`);
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });

    it('should show a meaningful message if it was thrown in "Then"', async () => {
      When(() => {});

      Then(() => {
        throw new Error(FAKE_ERROR_MESSAGE);
      });

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Then():`);
      expect(actualError.message).not.toContain('When():');
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });

    it('should show a meaningful message if it was thrown in "Then" with "done"', async () => {
      When(() => {});

      // WITH a "done"
      Then((done) => {
        throw new Error(FAKE_ERROR_MESSAGE);
      });

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Then():`);
      expect(actualError.message).not.toContain('When():');
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });

    it(`should show a meaningful message if it was thrown in "Then" with a "done"
        passed as a parameter to "done"`, async () => {
      Then((done) => {
        done(new Error(FAKE_ERROR_MESSAGE));
      });

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Then():`);
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });

    it(`should show a meaningful message if it was thrown in "Then" with a "done"
        passed via done.fail()`, async () => {
      Then((done) => {
        done.fail(new Error(FAKE_ERROR_MESSAGE));
      });

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Then():`);
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });

    it('should show a meaningful message if thrown as ERROR OBJECT in async "Then"', async () => {
      When(() => {});
      Then(async () => {
        throw new Error(FAKE_ERROR_MESSAGE);
      });

      try {
        await actualPromiseReturnedFromIt;
      } catch (err: any) {
        actualError = err;
      } finally {
        afterEachCache.forEach((fn) => fn());
      }

      expect(actualError.message).toContain(`${CONTEXT_FOR_GWT_ERROR} Then():`);
      expect(actualError.message).not.toContain('When():');
      expect(actualError.message).toContain(FAKE_ERROR_MESSAGE);
    });
  });
});
