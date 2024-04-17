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
})();
