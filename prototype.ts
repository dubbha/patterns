abstract class Prototype {
  abstract clone(): void;
}

class ScottishBlackfaceSheepPrototype extends Prototype {
  public faceColor: string;
  public name: string;

  constructor() {
    super();
    this.name = 'Cytoplasmic Donor';
    this.faceColor = 'black';
  }

  clone() {
    return Object.assign({}, this);   // just a shallow copy, nothing deep
  }
}

// Client code
const sheepClone = new ScottishBlackfaceSheepPrototype();
sheepClone.name = 'Dolly';

console.log(sheepClone.faceColor);  // 'black'
console.log(sheepClone.name);       // 'Dolly'
