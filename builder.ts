namespace Builder {
  /**
   * HouseDirector
   * @class
   */
  class HouseDirector {
    builder: HouseBuilder;
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
  abstract class HouseBuilder {
    constructor() {}

    /**
     * buildWalls abstract method
     * @abstract
     * @method
     */
    abstract buildWalls(): void;

    /**
     * addRoof abstract method
     * @abstract
     * @method
     */
    abstract addRoof(): void;

    /**
     * addWindows abstract method
     * @abstract
     * @method
     */
    abstract addWindows(): void;
  }

  /**
   * ConcreteHouseBuilder concrete class
   * @class
   * @extends HouseBuilder
   * @classdesc Builds a house made of concrete
   */
  class ConcreteHouseBuilder extends HouseBuilder {
    private concreteHouse: ConcreteHouse;

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
    private woodenHouse: WoodenHouse;

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
  abstract class House {
    public mainMaterial: string;
    public walls: {
      material: string,
      quantity: number,
    };
    public roof: {
      material: string,
      angleDegrees: number,
    };
    public windows: {
      material: string,
      quantity: number,
    };

    constructor() {
      this.walls = {
          material: null,
          quantity: null,
      };
      this.roof = {
        material: null,
        angleDegrees: null,
      };
      this.windows = {
          material: null,
          quantity: null,
      };
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
}
