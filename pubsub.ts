namespace PubSubPattern {
  interface Publisher {
    register(broker: Broker);
    publish(topic: string, news: string);
  }

  interface Subscriber {
    update(topic: string, news: string);
  }

  interface Broker {
    publish(topic: string, news: string);
    subscribe(subscriber: Subscriber, topic: string);
    unsubscribe(subscriber: Subscriber, topic: string);
  }

  class ConcretePublisher implements Publisher {
    private broker:Broker;

    register(broker: Broker) {
      this.broker = broker;
    }

    publish(topic: string, news: string) {
      this.broker.publish(topic, news);
    }
  }

  class ConcreteSubscriber implements Subscriber {
    constructor(private name: string) {}

    update(topic: string, news: string) {
      console.log(`Subscriber ${this.name} received update for topic ${topic}: ${news}`);
    }
  }

  class ConcreteBroker implements Broker {
    private subscribersByTopic: { [topic: string]: Subscriber[] } = {}

    publish(topic: string, news: string) {
      if (this.subscribersByTopic[topic]) {
        this.subscribersByTopic[topic].forEach(s => s.update(topic, news));
      }
    }

    subscribe(subscriber: Subscriber, topic: string) {
      if (!this.subscribersByTopic[topic]) {
        this.subscribersByTopic[topic] = [];
      }
      this.subscribersByTopic[topic].push(subscriber);
    }

    unsubscribe(subscriber: Subscriber, topic: string) {
      this.subscribersByTopic[topic] =
      this.subscribersByTopic[topic].filter(s => s !== subscriber);
    }
  }

  // Client code
  const broker = new ConcreteBroker();

  const publisherA = new ConcretePublisher();
  const publisherB = new ConcretePublisher();

  publisherA.register(broker);
  publisherB.register(broker);

  const subscriberX = new ConcreteSubscriber('X');
  const subscriberY = new ConcreteSubscriber('Y');
  const subscriberZ = new ConcreteSubscriber('Z');

  broker.subscribe(subscriberX, 'sports');
  broker.subscribe(subscriberY, 'finance');
  broker.subscribe(subscriberY, 'romance');
  broker.subscribe(subscriberZ, 'sports');
  broker.subscribe(subscriberZ, 'finance');

  publisherA.publish('romance', 'British Study');           // Subscriber Y received update for topic romance: British Study
  publisherA.publish('sports', 'Judo Final Results');       // Subscriber X received update for topic sports: Judo Final Results
                                                            // Subscriber Z received update for topic sports: Judo Final Results
  publisherB.publish('finance', 'NASDAQ Bear Trend');       // Subscriber Y received update for topic finance: NASDAQ Bear Trend
                                                            // Subscriber Z received update for topic finance: NASDAQ Bear Trend

  broker.unsubscribe(subscriberZ, 'sports');
  publisherB.publish('sports', 'Croquet Gains Popularity'); // Subscriber X received update for topic sports: Croquet Gains Popularity
}
