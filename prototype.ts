abstract class Prototype {
  abstract clone(): void;
}

class ScottishBlackfaceSheepPrototype extends Prototype {
  public name: string;
  public country: string;
  public face: {
    color: string,
    clone: Function,
  }


  constructor() {
    super();
    this.name = 'Cytoplasmic Donor';
    this.country = 'Scotland';
    this.face = {
      color: 'black',
      clone() {                             // complex property must have its own .clone() method
        return Object.assign({}, this);     // shallow copy of self
      }
    };
  }

  clone(): ScottishBlackfaceSheepPrototype {
    const cloneObj = {};

    Object.keys(this).forEach((key) => {
      const prop = this[key];

      // Cloning of complex properties is performed using their own .clone() method
      if (Object.prototype.toString.call(prop) === '[object Object]' && typeof prop.clone === 'function') {
        cloneObj[key] = prop.clone();
      } else {
        cloneObj[key] = prop;
      }
    });

    return <ScottishBlackfaceSheepPrototype>cloneObj;
  }
}

// Client code
const sheepPrototype = new ScottishBlackfaceSheepPrototype();

const sheepClone = sheepPrototype.clone();

sheepClone.name = 'Dolly';

console.log(sheepClone.name);         // 'Dolly'
console.log(sheepClone.country);      // 'Scotland'
console.log(sheepClone.face.color);   // 'black'
