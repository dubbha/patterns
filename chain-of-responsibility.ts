namespace ChainOfResponsibilityPattern {
  abstract class AirFilter {
    abstract filterAir(): void;
  }

  class MechanicalFilter10micron extends AirFilter {
    private nextFilter: AirFilter;

    filterAir() {
      console.log('Filtering out particles up to 10 micron. Passing on...');
      this.nextFilter.filterAir();
    }

    setNextFilter(nextFiler) {
      this.nextFilter = nextFiler;
    }
  }

  class MechanicalFilter5micron extends AirFilter {
    private nextFilter: AirFilter;

    filterAir() {
      console.log('Filtering out particles up to 5 micron. Passing on...');
      this.nextFilter.filterAir();
    }

    setNextFilter(nextFiler) {
      this.nextFilter = nextFiler;
    }
  }

  class HEPAFilter extends AirFilter {
    filterAir() {
      console.log('High efficiency particulate air filtering. Done.');
    }
  }

  // Client code
  const mechanicalFilter10micron = new MechanicalFilter10micron();
  const mechanicalFilter5micron = new MechanicalFilter5micron();
  const hepaFilter = new HEPAFilter();

  mechanicalFilter10micron.setNextFilter(mechanicalFilter5micron);
  mechanicalFilter5micron.setNextFilter(hepaFilter);

  mechanicalFilter10micron.filterAir();   // Filtering out particles up to 10 micron. Passing on...
                                          // Filtering out particles up to 5 micron. Passing on...
                                          // High efficiency particulate air filtering. Done.
}
