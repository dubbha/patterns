namespace Composite {
  // Component
  abstract class TreePart {
    abstract grow();
  }

  // Leaf
  class Leaf extends TreePart {
    private color;

    constructor(color) {
      super();
      this.color = color;
    }

    grow() {
      const colorMap = {  // node console colors map
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        black: '\x1b[37m',
      };

      console.log(colorMap[this.color], '\u2766');
    }
  }

  // Composite
  class Branch extends TreePart {
    private parts = [];

    grow() {
      this.parts.forEach(part => part.grow());
    }

    add(treePart: TreePart) {
      this.parts.push(treePart);
    }

    remove(treePart: TreePart) {
      this.parts = this.parts.filter(elem => elem !== treePart);
    }
  }

  // Client code
  const root = new Branch();
  root.add(new Leaf('red'));
  root.add(new Leaf('green'));

  const branch = new Branch();
  branch.add(new Leaf('yellow'));
  branch.add(new Leaf('blue'));

  const subBranch = new Branch();
  subBranch.add(new Leaf('cyan'));
  subBranch.add(new Leaf('magenta'));

  const blackLeaf = new Leaf('black');
  subBranch.add(blackLeaf);
  subBranch.remove(blackLeaf);

  branch.add(subBranch);
  root.add(branch);

  root.grow(); // six colorful leaves
}
