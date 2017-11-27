interface ITarget {
  chargeDC12V();
}

class OutletDC12V implements ITarget {
  public chargeDC12V() {
    return 'DC12V';
  };
}

class Adapter implements ITarget {
  private adaptee: OutletAC220V;

  constructor(adaptee) {
    this.adaptee = adaptee;
  }

  private transform(current) {
    return current.replace('AC', 'DC').replace('220', '12');
  }

  public chargeDC12V() {
    return this.transform(this.adaptee.chargeAC220V());
  }
}

class OutletAC220V {
  chargeAC220V() {
    return 'AC220V';
  }
}

// Client code
const adaptee = new OutletAC220V();
const adapter = new Adapter(adaptee);

console.log(adapter.chargeDC12V());     // 'DC12V'
