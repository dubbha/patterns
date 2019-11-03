namespace SimpleFactory {
  // Possible implementations:
  // - a class with a static method
  // - a function

  // class with static method
  class VehicleFactory {
    static create(type: 'car' | 'truck'): Vehicle {
      switch(type) {
        case 'car':
          return new Car();
        case 'truck':
          return new Truck();
        default:
          return null;
      }
    }
  }

  // function - even simpler option
  const VehicleFactoryFunction = (type: 'car' | 'truck'): Vehicle => {
    switch(type) {
      case 'car':
        return new Car();
      case 'truck':
        return new Truck();
      default:
        return null;
    }
  }

  interface Vehicle {
    signal(): void;
  }

  class Car implements Vehicle {
    signal() {
      console.log('fafa')
    }
  }

  class Truck implements Vehicle {
    signal() {
      console.log('vroom')
    }
  }

  // Client code
  const car = VehicleFactory.create('car');
  const truck = VehicleFactory.create('truck');

  car.signal();    // 'fafa'
  truck.signal();  // 'vroom'

  const car2 = VehicleFactoryFunction('car');
  const truck2 = VehicleFactoryFunction('truck');

  car2.signal();    // 'fafa'
  truck2.signal();  // 'vroom'
}
