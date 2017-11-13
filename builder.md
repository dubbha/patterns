### UML diagram
![builder](/img/builder.svg)

### Code [[source](builder.js)]
```js
/**
 * HouseDirector
 * @class
 */
class HouseDirector {
  constructor() {
    this.builder = null;
  }

  setBuilder(builder) {
    this.builder = builder;
  }

  buildHouse() {
    this.builder.buildWalls();
    this.builder.addRoof();
    this.builder.addWindows();
  }
}



/**
 * HouseBuilder abstract class
 * @abstract
 * @class
 */
class HouseBuilder {
  constructor() {
    if (this.constructor === HouseBuilder) {
      // Abstract class was called with new
      throw new TypeError('Abstract class cannot be instantiated directly');
    }
  }

  /**
   * buildWalls abstract method
   * @abstract
   * @method
   */
  buildWalls() {
    throw new Error('Abstract method buildWalls() must be implemented by subclass');
  }

  /**
   * addRoof abstract method
   * @abstract
   * @method
   */
  addRoof() {
    throw new Error('Abstract method addRoof() must be implemented by subclass');
  }

  /**
   * addWindows abstract method
   * @abstract
   * @method
   */
  addWindows() {
    throw new Error('Abstract method addWindows() must be implemented by subclass');
  }
}

/**
 * ConcreteHouseBuilder concrete class
 * @class
 * @extends HouseBuilder
 * @classdesc Builds a house made of concrete
 */
class ConcreteHouseBuilder extends HouseBuilder {
  constructor() {
    super();

    this.concreteHouse = new ConcreteHouse();
  }

  buildWalls() {
    this.concreteHouse.buildWalls();
  }

  addRoof() {
    this.concreteHouse.addRoof();
  }

  addWindows() {
    this.concreteHouse.addWindows();
  }

  getResult() {
    return this.concreteHouse;
  }
}

/**
 * WoodenHouseBuilder concrete class
 * @class
 * @extends HouseBuilder
 * @classdesc Builds a house made of wood
 */
class WoodenHouseBuilder extends HouseBuilder {
  constructor() {
    super();

    this.woodenHouse = new WoodenHouse();
  }

  buildWalls() {
    this.woodenHouse.buildWalls();
  }

  addRoof() {
    this.woodenHouse.addRoof();
  }

  addWindows() {
    this.woodenHouse.addWindows();
  }

  getResult() {
    return this.woodenHouse;
  }
}



/**
 * House abstract class
 * @abstract
 * @class
 */
class House {
  constructor() {
    if (this.constructor === House) {
      // Abstract class was called with new
      throw new TypeError('Abstract class cannot be instantiated directly');
    }

    this.mainMaterial = null;
    this.walls = {};
    this.roof = {};
    this.windows = {};
  }

  /**
   * buildWalls abstract method
   * @abstract
   * @method
   */
  buildWalls() {
    throw new Error('Abstract method buildWalls() must be implemented by subclass');
  }

  /**
   * addRoof abstract method
   * @abstract
   * @method
   */
  addRoof() {
    throw new Error('Abstract method addRoof() must be implemented by subclass');
  }

  /**
   * addWindows abstract method
   * @abstract
   * @method
   */
  addWindows() {
    throw new Error('Abstract method addWindows() must be implemented by subclass');
  }
}

/**
 * ConcreteHouse concrete class
 * @class
 */
class ConcreteHouse extends House {
  constructor() {
    super();

    this.mainMaterial = 'concrete';
  }

  buildWalls() {
    this.walls.material = this.mainMaterial;
    this.walls.quantity = 5;
  }

  addRoof() {
    this.roof.material = 'metal';
    this.roof.angleDegrees = 15;
  }

  addWindows() {
    this.windows.material = 'armored glass';
    this.windows.quantity = 10;
  }
}

/**
 * WoodenHouse concrete class
 * @class
 */
class WoodenHouse extends House {
  constructor() {
    super();

    this.mainMaterial = 'wood';
  }

  buildWalls() {
    this.walls.material = this.mainMaterial;
    this.walls.quantity = 4;
  }

  addRoof() {
    this.roof.material = 'terracotta';
    this.roof.angleDegrees = 30;
  }

  addWindows() {
    this.windows.material = 'glass';
    this.windows.quantity = 4;
  }
}



/**
 * Client code
 */
const builder = new ConcreteHouseBuilder();

const director = new HouseDirector();
director.setBuilder(builder);
director.buildHouse();

const house = builder.getResult();

console.log(house.mainMaterial);        // 'concrete'

console.log(house.walls.material);      // 'concrete'
console.log(house.walls.quantity);      // 5

console.log(house.roof.material);       // 'metal'
console.log(house.roof.angleDegrees);   // 15

console.log(house.windows.material);    // 'armored glass'
console.log(house.windows.quantity);    // 10

```
