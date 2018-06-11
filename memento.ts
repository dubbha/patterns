namespace MementoPattern {
  class Memento {
    private state;

    constructor(state) {
      this.state = state;
    }

    getState() {
      return this.state;
    }
  }

  class Originator {    // Person
    private state;

    constructor(fname, lname) {
      this.state = {
        fname: fname,
        lname: lname,
      }
    }

    getName() {
      return `${this.state.fname} ${this.state.lname}`;
    }

    setName(fname, lname) {
      this.state.fname = fname;
      this.state.lname = lname;
    }

    saveToMemento(): Memento {
      return new Memento({ ...this.state });        // copy object or JSON.stringify()
    }

    restoreFromMemento(memento: Memento): void {
      this.state = memento.getState();              // JSON.parse()
    }

  }

  class CareTaker {
    private mementos = [];

    save(memento): void {
      this.mementos.push(memento);
    }

    get(): Memento {
      return this.mementos.pop();
    }
  }

  // Client code
  const p = new Originator('John', 'Doe');
  console.log(p.getName());             // 'John Doe'

  const store = new CareTaker();
  store.save(p.saveToMemento());

  p.setName('Bart', 'Simpson');
  console.log(p.getName());             // 'Bart Simpson'
  store.save(p.saveToMemento());

  p.setName('Adi', 'Dassler');
  console.log(p.getName());             // 'Adi Dassler'

  p.restoreFromMemento(store.get());
  console.log(p.getName());             // 'Bart Simpson'

  p.restoreFromMemento(store.get());
  console.log(p.getName());             // 'John Doe'

}
