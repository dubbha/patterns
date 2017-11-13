/**
 * HouseDirector
 * @class
 */
class HouseDirector {
  constructor(builder) {
    this.builder = builder;
  }

  buildHouse() {
    this.builder.buildWalls();
    this.builder.addRoof();
    this.builder.addWindows();
  }
}

/**
 * AbstractHouseBuilder abstract class
 * @abstract
 * @class
 */
class AbstractHouseBuilder {
  constructor() {
    if (this.constructor === AbstractHouseBuilder) {
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
 * @extends AbstractHouseBuilder
 * @classdesc Builds a house made of concrete
 */
class ConcreteHouseBuilder extends AbstractHouseBuilder {
  constructor() {
    super();

    this.house = {
      mainMaterial: 'concrete',
    };
  }

  buildWalls() {
    this.house.walls = {};
    this.house.walls.material = this.house.mainMaterial;
    this.house.walls.quantity = 5;
  }

  addRoof() {
    this.house.roof = {};
    this.house.roof.material = 'metal';
    this.house.roof.angleDegrees = 15;
  }

  addWindows() {
    this.house.windows = {};
    this.house.windows.material = 'armored glass';
    this.house.windows.quantity = 10;
  }

  getResult() {
    return this.house;
  }
}

/**
 * WoodenHouseBuilder concrete class
 * @class
 * @extends AbstractHouseBuilder
 * @classdesc Builds a house made of wood
 */
class WoodenHouseBuilder extends AbstractHouseBuilder {
  constructor() {
    super();

    this.house = {
      mainMaterial: 'wood',
    };
  }

  buildWalls() {
    this.house.walls = {};
    this.house.walls.material = this.house.mainMaterial;
    this.house.walls.quantity = 4;
  }

  addRoof() {
    this.house.roof = {};
    this.house.roof.material = 'terracotta';
    this.house.roof.angleDegrees = 30;
  }

  addWindows() {
    this.house.windows = {};
    this.house.windows.material = 'glass';
    this.house.windows.quantity = 4;
  }

  getResult() {
    return this.house;
  }
}

/**
 * Client code
 */
const builder = new ConcreteHouseBuilder();

const director = new HouseDirector(builder);
director.buildHouse();

const house = builder.getResult();

console.log(house.mainMaterial);        // 'concrete'

console.log(house.walls.material);      // 'concrete'
console.log(house.walls.quantity);      // 5

console.log(house.roof.material);       // 'metal'
console.log(house.roof.angleDegrees);   // 15

console.log(house.windows.material);    // 'armored glass'
console.log(house.windows.quantity);    // 10

