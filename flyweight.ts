namespace FlyweightPattern {
  interface ISnowman {
    draw(times: number): void;
    getAssociations(): void;
  }

  class Snowman implements ISnowman {
    // Extrinsic state
    private times: number;

    // Intrinsic state, shared data
    private color: string;

    // Intrinsic state, shared data
    private associations = [
      'snow',
      'winter',
      'christmas',
      'new year',
      'santa claus',
    ];

    // Intrinsic state, shared data
    private colorMap = {
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      black: '\x1b[37m',
    };

    constructor(color) {
      this.color = color;
    }

    draw(times = 1) {
      this.times = times;
      const str = Array(this.times).fill('\u2603').join('');
      console.log(this.colorMap[this.color], str);
    }

    getAssociations() {
      console.log(this.associations.join(', '));
    }
  }

  class SnowmanFactory {
    private cache = {};

    buildSnowman(color) {
      if (this.cache[color]) {
        return this.cache[color];
      }
      const instance = new Snowman(color);
      this.cache[color] = instance;
      return this.cache[color];
    }
  }

  // Client code
  const snowmanFactory = new SnowmanFactory();

  const redSnowman1 = snowmanFactory.buildSnowman('red');
  redSnowman1.draw();
  const redSnowman2 = snowmanFactory.buildSnowman('red');
  redSnowman2.draw(3);

  const greenSnowman1 = snowmanFactory.buildSnowman('green');
  greenSnowman1.draw(2);
  const greenSnowman2 = snowmanFactory.buildSnowman('green');
  greenSnowman2.draw(4);

  console.log(redSnowman1 === redSnowman2);       // true
  console.log(greenSnowman1 === greenSnowman2);   // true
  console.log(redSnowman1 === greenSnowman1);     // false

  redSnowman1.getAssociations();                  // snow, winter, christmas, new year, santa claus
}
