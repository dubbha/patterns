namespace MediatorPattern {
  abstract class TaxiService {
    abstract registerClient(client: Client): void;
    abstract addAvailableDriver(driver: Driver): void;
    abstract incomingOrder(client: Client, address: string): void;
  }

  class Uber extends TaxiService {
    private clients: Client[] = [];
    private availableDrivers: Driver[] = [];

    registerClient(client: Client) {
      this.clients.push(client);
    }

    addAvailableDriver(driver) {
      this.availableDrivers.forEach(i => i.radio(`${driver.name} says hello`));
      this.availableDrivers.push(driver);
    }

    incomingOrder(client: Client, address: string) {
      const driver = this.availableDrivers.shift();
      driver.assignOrder(address);
      console.log(`${address}, ${client.name}, assigned to ${driver.name}`);
    }
  }

  abstract class Colleague {
    protected taxiService: TaxiService;
    public name;

    constructor(name) {
      this.name = name;
    }

    abstract register(taxiService: TaxiService);
  }

  class Client extends Colleague {
    register(taxiService) {
      this.taxiService = taxiService;
      this.taxiService.registerClient(this);
    }

    orderTaxi(address: string) {
      this.taxiService.incomingOrder(this, address);
    }
  }

  class Driver extends Colleague {
    private orderAddress: string;
    private radioMessage: string;

    register(taxiService) {
      this.taxiService = taxiService;
      this.taxiService.addAvailableDriver(this);
    }

    assignOrder(orderAddress: string) {
      this.orderAddress = orderAddress;
    }

    radio(radioMessage: string) {
      this.radioMessage = radioMessage;
      console.log(`[${this.name}'s Radio] ${this.radioMessage}`);
    }
  }

  // Client code
  const uber = new Uber();

  const driver1 = new Driver('Bill Wheel');
  const driver2 = new Driver('John Engine');
  const driver3 = new Driver('Paz Gas');

  const client1 = new Client('Lady Gaga');
  const client2 = new Client('Mister Smith');

  driver1.register(uber);
  driver2.register(uber);                 // [Bill Wheel's Radio] John Engine says hello
  driver3.register(uber);                 // [Bill Wheel's Radio] Paz Gas says hello
                                          // [John Engine's Radio] Paz Gas says hello

  client1.register(uber);
  client2.register(uber);

  client1.orderTaxi('5 Maple Street');    // 5 Maple Street, Lady Gaga, assigned to Bill Wheel
  client2.orderTaxi('17 Smith Street');   // 17 Smith Street, Mister Smith, assigned to John Engine
}
