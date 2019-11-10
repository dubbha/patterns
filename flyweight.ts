namespace FlyweightPattern {
  interface ISnowman {
    draw(times: number): void;
  }

  interface RepeatingState {    // Intrinsic state, shared data
    color: string,
  }

  interface UniqueState {       // Extrinsic state,  unique data
    times: number,
  }

  class SnowmanContext implements ISnowman {
    private flyweight: SnowmanFlyweight;    // Reference to Flyweight
    private state: UniqueState;             // Extrinsic state,  unique data

    constructor(
      factory: SnowmanFlyweightFactory,
      repeatingState: RepeatingState,
      uniqueState: UniqueState
    ) {
      this.flyweight = factory.buildSnowman(repeatingState);
      this.state = uniqueState;
    }

    draw() {
      this.flyweight.draw(this.state);
    }
  }

  class SnowmanFlyweight {
    private state: RepeatingState         // Intrinsic state, shared data

    constructor(repeatingState: RepeatingState) {
      this.state = repeatingState;
    }

    draw(uniqueState) {
      const colorMap = {
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        black: '\x1b[37m',
      };

      const str = Array(uniqueState.times).fill('\u2603').join('');
      console.log(colorMap[this.state.color], str);
    }
  }

  class SnowmanFlyweightFactory {
    private cache = {};

    buildSnowman(repeatingState) {
      const hash = JSON.stringify(repeatingState);
      if (this.cache[hash]) {
        return this.cache[hash];
      }
      this.cache[hash] = new SnowmanFlyweight(repeatingState);
      return this.cache[hash];
    }

    getCacheLength() {
      console.log(Object.keys(this.cache).length);
    }
    getCache() {
      console.log(this.cache);
    }
  }

  // Client code
  const factory = new SnowmanFlyweightFactory();

  const snowman1 = new SnowmanContext(factory, { color: 'red' }, { times: 1 });
  snowman1.draw();
  const snowman2 = new SnowmanContext(factory, { color: 'red' }, { times: 3 });
  snowman2.draw();
  factory.getCacheLength();     // 1

  const snowman3 = new SnowmanContext(factory, { color: 'green' }, { times: 2 });
  snowman3.draw();
  factory.getCacheLength();     // 2

  const snowman4 = new SnowmanContext(factory, { color: 'blue' }, { times: 1 });
  snowman4.draw();
  const snowman5 = new SnowmanContext(factory, { color: 'blue' }, { times: 3 });
  snowman5.draw();
  const snowman6 = new SnowmanContext(factory, { color: 'blue' }, { times: 5 });
  snowman6.draw();
  factory.getCacheLength();     // 3
  factory.getCache();
    // {
    //   '{"color":"red"}': SnowmanFlyweight { state: { color: 'red' } },
    //   '{"color":"green"}': SnowmanFlyweight { state: { color: 'green' } },
    //   '{"color":"blue"}': SnowmanFlyweight { state: { color: 'blue' } }
    // }
}
