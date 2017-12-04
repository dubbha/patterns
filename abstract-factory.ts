namespace AbstractFactoryPattern {
  /*
  * AbstractVehicleFactory abstract class
  * @abstract
  * @class
  */
  abstract class AbstractVehicleFactory {
    /* buildCar abstract method
    * @abstract
    * @method
    */
    abstract buildCar(): void;

    /* buildCar abstract method
    * @abstract
    * @method
    */
    abstract buildTruck(): void;
  }

  /*
  * FrenchVehicleFactory concrete class
  * @class
  */
  class FrenchVehicleFactory extends AbstractVehicleFactory {
    buildCar() {
      return new FrenchCar();
    }

    buildTruck() {
      return new FrenchTruck();
    }
  }

  /*
  * GermanVehicleFactory concrete class
  * @class
  */
  class GermanVehicleFactory extends AbstractVehicleFactory {
    buildCar() {
      return new GermanCar();
    }

    buildTruck() {
      return new GermanTruck();
    }
  }



  /*
  * AbstractCar abstract class
  * @abstract
  * @class
  */
  abstract class AbstractCar {
    /* say abstract method
    * @abstract
    * @method
    */
    abstract say(): void;
  }

  /*
  * FrenchCar concrete class
  * @class
  */
  class FrenchCar extends AbstractCar {
    say() {
      console.log('la fafa');
    }
  }

  /*
  * GermanCar concrete class
  * @class
  */
  class GermanCar extends AbstractCar {
    say() {
      console.log('das fafa');
    }
  }



  /*
  * AbstractTruck abstract class
  * @abstract
  * @class
  */
  abstract class AbstractTruck {
    /* say abstract method
    * @abstract
    * @method
    */
    abstract say(): void;
  }

  /**
   * FrenchTruck concrete class
   * @class
   */
  class FrenchTruck extends AbstractTruck {
    say() {
      console.log('la wroom');
    }
  }

  /**
   * GermanTruck concrete class
   * @class
   */
  class GermanTruck extends AbstractTruck {
    say() {
      console.log('das wroom');
    }
  }



  /**
   * VehicleFactorySelector
   * Indirect way of instantiating the factories
   */
  class VehicleFactorySelector {
    private factory: GermanVehicleFactory | FrenchVehicleFactory;

    constructor(pleaseWord) {
      this.factory = (pleaseWord === 'bitte')
        ? new GermanVehicleFactory()
        : new FrenchVehicleFactory();
    }

    getFactory() {
      return this.factory;
    }
  }

  /**
   * Client code
   */
  const factorySelector = new VehicleFactorySelector('bitte');
  const factory = factorySelector.getFactory();

  const car = factory.buildCar();
  const truck = factory.buildTruck();

  car.say();     // 'das fafa'
  truck.say();   // 'das wroom'
}
