/*
 * AbstractVehicleFactory abstract class
 * @abstract
 * @class
 */
class AbstractVehicleFactory {
  constructor() {
    if (this.constructor === AbstractVehicleFactory) {
      // Abstract class was called with new
      throw new TypeError('Abstract class cannot be instantiated directly');
    }
  }

  /* buildCar abstract method
   * @abstract
   * @method
   */
  buildCar() {
    throw new Error('Abstract method buildCar() must be implemented by subclass');
  }

  /* buildCar abstract method
   * @abstract
   * @method
   */
  buildTruck() {
    throw new Error('Abstract method buildTrack() must be implemented by subclass');
  }
}

/*
 * FrenchVehicleFactory concrete class
 * @class
 */
class FrenchVehicleFactory extends AbstractVehicleFactory {
  constructor() {
    super();
  }

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
  constructor() {
    super();
  }

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
class AbstractCar {
  constructor() {
    if (this.constructor === AbstractCar) {
      // Abstract class was called with new
      throw new TypeError('Abstract class cannot be instantiated directly');
    }
  }

  /* say abstract method
   * @abstract
   * @method
   */
  say() {
    throw new Error('Abstract method buildCar() must be implemented by subclass');
  }
}

/*
 * FrenchCar concrete class
 * @class
 */
class FrenchCar extends AbstractCar {
  constructor() {
    super();
  }

  say() {
    console.log('la fafa');
  }
}

/*
 * GermanCar concrete class
 * @class
 */
class GermanCar extends AbstractCar {
  constructor() {
    super();
  }

  say() {
    console.log('das fafa');
  }
}



/*
 * AbstractTruck abstract class
 * @abstract
 * @class
 */
class AbstractTruck {
  constructor() {
    if (this.constructor === AbstractTruck) {
      // Abstract class was called with new
      throw new TypeError('Abstract class cannot be instantiated directly');
    }
  }

  /* say abstract method
   * @abstract
   * @method
   */
  say() {
    throw new Error('Abstract method buildCar() must be implemented by subclass');
  }
}

/**
 * FrenchTruck concrete class
 * @class
 */
class FrenchTruck extends AbstractTruck {
  constructor() {
    super();
  }

  say() {
    console.log('la wroom');
  }
}

/**
 * GermanTruck concrete class
 * @class
 */
class GermanTruck extends AbstractTruck {
  constructor() {
    super();
  }

  say() {
    console.log('das wroom');
  }
}



/**
 * VehicleFactorySelector
 * Indirect way of instantiating the factories
 */
class VehicleFactorySelector {
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


