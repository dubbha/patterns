namespace StrategyPattern {
  class DeliveryContext {                   // Context
    strategy: DeliveryStrategy

    setStrategy(strategy: DeliveryStrategy) {
      this.strategy = strategy;
    }

    deliverPizza() {
      this.strategy.deliverPizza();
    }
  }

  abstract class DeliveryStrategy {            // Strategy
    abstract deliverPizza();
  }

  class WalkingDelivery extends DeliveryStrategy {
    deliverPizza() {
      console.log('Delivering pizza by foot, takes 20 mins on average');
    }
  }

  class MotoDelivery extends DeliveryStrategy {
    deliverPizza() {
      console.log('Delivering pizza by scooter, takes 7 mins on average');
    }
  }

  // Client code
  const context = new DeliveryContext();

  context.setStrategy(new WalkingDelivery());
  context.deliverPizza();   // Delivering pizza by foot, takes 20 mins on average

  context.setStrategy(new MotoDelivery());
  context.deliverPizza();   // Delivering pizza by scooter, takes 7 mins on average

}
