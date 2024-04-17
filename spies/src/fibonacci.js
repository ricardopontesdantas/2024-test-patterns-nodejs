class Fibonacci {
  *execute(input = 0, current = 0, next = 1) {
    if (input === 0) return;
    yield current;
    yield* this.execute(--input, next, current + next);
  }
}

module.exports = Fibonacci;
