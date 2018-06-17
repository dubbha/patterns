namespace ObserverPattern {
  abstract class Professional {                      // Subject
    observers: Recruiter[] = [];

    subscribe(observer: Recruiter): void {
      this.observers.push(observer);
    }

    unsubscribe(observer: Recruiter): void {
      this.observers = this.observers.filter(o => o !== observer);
    }

    notify() {
      this.observers.forEach(o => o.update());
    }
  }

  class ConcreteProfessinal extends Professional {
    availabilityForJobs: boolean = false;

    getState() {
      return this.availabilityForJobs;
    }
  }

  interface Recruiter {                     // Observer
    update(): void;
  }

  class ConcreteRecruiter implements Recruiter {
    subject: ConcreteProfessinal;
    candidateAvailability: boolean;
    name: string;

    constructor(subject: ConcreteProfessinal, name) {
      this.subject = subject;
      this.name = name;
    }

    update() {
      this.candidateAvailability = this.subject.getState();
      console.log(`${this.name} got notification, candidate is ${this.candidateAvailability ? '' : 'NOT '}available`);
    }
  }

  // Client code
  const subject = new ConcreteProfessinal();

  const observer1 = new ConcreteRecruiter(subject, 'Jane');
  const observer2 = new ConcreteRecruiter(subject, 'Maria');
  const observer3 = new ConcreteRecruiter(subject, 'Natalie');

  subject.subscribe(observer1);
  subject.subscribe(observer2);
  subject.subscribe(observer3);

  console.log(subject.observers.length);    // 3

  subject.notify();                         // Jane got notification, candidate is not available
                                            // Maria got notification, candidate is not available
                                            // Natalie got notification, candidate is not available

  subject.unsubscribe(observer2);
  console.log(subject.observers.length);    // 2

  subject.availabilityForJobs = true;
  subject.notify();                         // Jane got notification, candidate is available
                                            // Natalie got notification, candidate is available
}
