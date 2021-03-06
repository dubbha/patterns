namespace AdapterPattern {
  interface InterfaceDC12V {
    chargeDC12V();
  }

  class OutletDC12V implements InterfaceDC12V {
    public chargeDC12V() {
      return 'DC12V';
    };
  }

  class Adapter implements InterfaceDC12V {
    private adaptee: OutletAC220V;

    constructor() {
      this.adaptee = new OutletAC220V();
    }

    private transformACDC(current) {
      return current.replace('AC', 'DC').replace('220', '12');
    }

    public chargeDC12V() {
      return this.transformACDC(this.adaptee.chargeAC220V());
    }
  }

  class OutletAC220V {
    chargeAC220V() {
      return 'AC220V';
    }
  }

  // Client code
  const adapter = new Adapter();

  console.log(adapter.chargeDC12V());     // 'DC12V'
}
