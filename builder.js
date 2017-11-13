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
    this.concreteHouse.walls.material = this.concreteHouse.mainMaterial;
    this.concreteHouse.walls.quantity = 5;
  }

  addRoof() {
    this.concreteHouse.roof.material = 'metal';
    this.concreteHouse.roof.angleDegrees = 15;
  }

  addWindows() {
    this.concreteHouse.windows.material = 'armored glass';
    this.concreteHouse.windows.quantity = 10;
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
    this.woodenHouse.walls.material = this.woodenHouse.mainMaterial;
    this.woodenHouse.walls.quantity = 4;
  }

  addRoof() {
    this.woodenHouse.roof.material = 'terracotta';
    this.woodenHouse.roof.angleDegrees = 30;
  }

  addWindows() {
    this.woodenHouse.windows.material = 'glass';
    this.woodenHouse.windows.quantity = 4;
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
