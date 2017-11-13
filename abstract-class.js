/*
 * Abstract class
 * @abstract
 * @class
 */
class House {
  constructor() {
    if (this.constructor === House) {
      // Abstract class was called with new
      throw new TypeError('Abstract class cannot be instantiated directly');
    }
  }

  /* Abstract method
   * @abstract
   * @method
   */
  build() {
    throw new Error('Abstract method build() must be implemented by subclass');
  }
}

/*
 * Concrete class
 * @class
 */
class ConcreteHouse extends House {
  constructor() {
    super();
  }

  build() {
    console.log('building concrete house');
  }
}

// The following would fail with 'Abstract class cannot be instantiated directly'
// const house = new House();

// The following would fail with 'Abstract method build() must be implemented by subclass'
// House.prototype.build();

// Expected usage
const house = new ConcreteHouse();
house.build();                          // 'building concrete house'
