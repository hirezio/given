export const NO_SPEC_FUNCTION_ERROR =
  'You must provide a function as the second argument to Then("some label", () => {} )';

export const CONTEXT_FOR_GWT_ERROR = 'An error was thrown in';

export const NO_STACK_ERROR = `Unfortunately, this error was thrown as a string, 
so no *real* stack trace for you :(`;

export interface DoneFn {
  (...args: Error[]): void;
  fail: (...args: Error[]) => void;
}

interface TestCallback {
  (done: DoneFn): any;
}

declare global {
  function Given(fn: TestCallback): void;
  function When(fn: TestCallback): void;
  function Then(label: string, fn: TestCallback): void;
  function Then(fn: TestCallback): void;
}

const root = (0, eval)('this');
const whenFnsQueue: any[] = [];

let currentUserContext: any = null;

beforeEach(function () {
  currentUserContext = this;
});

root.Given = function Given(givenSetupFn: any) {
  async function wrappedFn() {
    try {
      return await promisify(givenSetupFn);
    } catch (error: any) {
      throwErrorWithContext('Given', error);
    }
  }

  beforeEach(wrappedFn);
};

root.When = function When(whenSetupFn: any) {
  beforeEach(function addWhenToQueue() {
    whenFnsQueue.push(whenSetupFn);
  });

  afterEach(function cleanWhenQueue() {
    whenFnsQueue.pop();
  });
};

root.Then = function Then(specFnOrLabel: TestCallback | string, specFn?: TestCallback) {
  const [label, actualSpecFunction] = getLabelAndFunction(specFnOrLabel, specFn);

  it(label, async function itCallbackInsideOfThen() {
    const fnQueue = [...whenFnsQueue, actualSpecFunction];
    const fnsLength = fnQueue.length;

    for (const [fnIndex, fn] of fnQueue.entries()) {
      const originFunctionName = fnIndex === fnsLength - 1 ? 'Then' : 'When';

      try {
        await promisify(fn);
      } catch (error: any) {
        throwErrorWithContext(originFunctionName, error);
      }
    }
  });
};

function getLabelAndFunction(
  specFnOrLabel: string | TestCallback,
  specFn?: TestCallback
): [string, TestCallback] {
  let label: string = '';
  let actualSpecFunction: TestCallback;
  if (typeof specFnOrLabel === 'string') {
    label = '\n   -> Then ' + specFnOrLabel;
    if (!specFn) {
      throw new Error(NO_SPEC_FUNCTION_ERROR);
    }
    actualSpecFunction = specFn;
  } else {
    actualSpecFunction = specFnOrLabel;
  }
  return [label, actualSpecFunction];
}

async function promisify(fn: TestCallback): Promise<TestCallback | undefined> {
  if (doesFunctionHaveParams(fn)) {
    return new Promise((resolve, reject) => {
      function next(err: Error) {
        if (err) {
          reject(err);
          return;
        }
        resolve(undefined);
      }
      next.fail = function nextFail(err: Error) {
        reject(err);
      };

      fn.call(currentUserContext, next);
    });
  }
  return await (fn as () => any).call(currentUserContext);
}

function throwErrorWithContext(
  originFunctionName: string,
  originalError: Error | string
) {
  const messagePrefix = `${CONTEXT_FOR_GWT_ERROR} ${originFunctionName}():`;

  if (typeof originalError === 'string') {
    throw new Error(`${messagePrefix}\n${originalError}\n${NO_STACK_ERROR}`);
  }

  const errorMessage = `${originalError.name || 'Error'}: ${originalError.message}`;
  const newError = new Error(`${messagePrefix}\n${errorMessage}`);

  newError.stack = `${messagePrefix}\n${originalError.stack}`;

  throw newError;
}

function doesFunctionHaveParams(fn: (...args: any[]) => any) {
  return fn.length > 0;
}
