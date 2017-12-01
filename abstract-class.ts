namespace AbstractClass {
  /**
   * Abstract class
   * @abstract
   * @class
   */
  abstract class House {
    abstract build(): void;
  }

  /**
   * Concrete class
   * @class
   */
  class ConcreteHouse extends House {
    build() {
      console.log('building concrete house');
    }
  }

  const house = new ConcreteHouse();
  house.build();                      // 'building concrete house'
}
