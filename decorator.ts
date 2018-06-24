namespace DecoratorPattern {
  abstract class Snowman {
    abstract draw(): void;
  }

  class BasicSnowman extends Snowman {
    draw() {
      console.log('\x1b[37m', '\u2603');
    }
  }

  abstract class Decorator extends Snowman {
    protected snowman: Snowman;

    constructor(snowman) {
      super();
      this.snowman = snowman;
    }
  }

  class ColorfulSnowman extends Decorator {
    private color: string;

    constructor(snowman, color) {
      super(snowman);
      this.color = color;
    }

    draw() {
      const colorMap = {
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        black: '\x1b[37m',
      };

      console.log(colorMap[this.color], '\u2603');
    }
  }

  class DancingSnowman extends Decorator {
    constructor(snowman) {
      super(snowman);
    }

    draw() {
      this.snowman.draw();
      this.dance();
    }

    dance() {
      console.log('Inside I\'m Dancing');
    }
  }

  // Client code
  const basicSnowman = new BasicSnowman();
  basicSnowman.draw();

  const colorfulSnowman = new ColorfulSnowman(basicSnowman, 'red');
  colorfulSnowman.draw();

  const dancingSnowman = new DancingSnowman(basicSnowman);
  dancingSnowman.draw();

  const colorfulDancingSnowman = new DancingSnowman(new ColorfulSnowman(new BasicSnowman(), 'green'));
  colorfulDancingSnowman.draw();
}
