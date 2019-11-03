/*
  Lazy Initialization is the tactic of delaying
   - the creation of an object (instantiation of a class),
   - the calculation of a value,
   - or some other expensive process
  until the first time it is needed
*/
namespace LazyInitializationPattern {
  class Result {
    constructor(public result: number, public ms: number) {}
  }

  const fib = n => (n === 0 || n === 1) ? 1 : fib(n - 2) + fib(n - 1);

  class Fibonacci {
    private static results: { [n: number]: Result } = {};

    private constructor() {}                  // private constructor, can't call new Fibonacci()

    static getInstance(n: number): Result {   // static method returning a reference to the instance
      if (!Fibonacci.results[n]) {                      // lazy initialization
        const start = process.hrtime();
        const result = fib(n);                          // lazy calculation
        const diff = process.hrtime(start);
        const ms = diff[0]*1000 + diff[1] / 1e6;

        Fibonacci.results[n] = new Result(result, ms);  // lazy instantiation
        // Fibonacci.results[n] = { result, ms }        // lazy creation of an object alternative
      }
      return Fibonacci.results[n];                      // memoization: previous result returned
    }
  }

  // Client code
  const fib10 = Fibonacci.getInstance(10);
  console.log(
    `fib(10): ${fib10.result}, took ${fib10.ms} ms to calculate`
  );  // fib(10): 89, took 0.178986 ms to calculate


  const fib30 = Fibonacci.getInstance(30);
  console.log(
    `fib(30): ${fib30.result}, took ${fib30.ms} ms to calculate`
  );  // fib(30): 1346269, took 14.610334 ms to calculate

  const anotherFib30 = Fibonacci.getInstance(30);
  console.log(
    `fib(30): ${anotherFib30.result}, took ${anotherFib30.ms} ms to calculate`
  );  // fib(30): 1346269, took 14.610334 ms to calculate
      // exact same output, memoized, not really re-calculated
}
