const { createSandbox } = require("sinon");
const sinon = createSandbox();
const assert = require("assert");
const Fibonacci = require("./fibonacci");

(async () => {
  {
    const input = 3;
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    for (sequence of fibonacci.execute(input)) {
    }
    const expectedCallCount = 4;
    assert.deepEqual(
      spy.callCount,
      expectedCallCount,
      "it should calculate how many times the function was called in the 3rd sequence and the result must be 4"
    );
  }
  {
    const input = 5;
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const results = [...fibonacci.execute(input)];
    const expectedCallCount = 6;
    assert.deepEqual(
      spy.callCount,
      expectedCallCount,
      "it should calculate how many times the function was called in the 5th sequence and the result must be 6"
    );
    const { args } = spy.getCall(2);
    const expectedParams = [3, 1, 2];
    assert.deepStrictEqual(
      args,
      expectedParams,
      "it should get the arguments of 2nd sequence and the result must be [3, 1, 2]"
    );
    const expectedResults = [0, 1, 1, 2, 3];
    assert.deepStrictEqual(
      results,
      expectedResults,
      "it should return the 5th sequence and the result must be [0, 1, 1, 2, 3]"
    );
  }
})();
