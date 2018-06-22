namespace AbstractMethodPattern {
  abstract class PillCreator {
    public theChosenPill: Pill;

    abstract createPill(): Pill;

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
    color: string = 'red';
  }

  class BluePill extends Pill {
    color: string = 'blue';
  }

  // Client code
  const pill = new RedPillChooser();
  pill.choosePill();
  console.log(pill.theChosenPill.color);    // 'red'
}
