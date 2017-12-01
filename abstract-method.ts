namespace AbstractMethod {
  abstract class PillCreator {
    public theChosenPill;

    abstract createPill(): void;

    choosePill() {
      this.theChosenPill = this.createPill();
    }
  }

  class RedPillChooser extends PillCreator {
    createPill() {
      return new RedPill();
    }
  }

  class BluePillChooser extends PillCreator {
    createPill() {
      return new BluePill();
    }
  }

  abstract class Pill {
    public color: string;
  }

  class RedPill extends Pill {
    constructor() {
      super();
      this.color = 'red';
    }
  }

  class BluePill extends Pill {
    constructor() {
      super();
      this.color = 'blue';
    }
  }

  // Client code
  const pill = new RedPillChooser();
  pill.choosePill();
  console.log(pill.theChosenPill.color);    // 'red'
}
