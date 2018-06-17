namespace TemplateMethodPattern {
  abstract class Cooking {
    followRecipe() {
      this.prepare();
      this.mix();
      this.cook();
    }

    abstract prepare();
    abstract mix();
    abstract cook();
  }

  class PizzaCooking extends Cooking {
    prepare() {
      console.log('Preparing dough, tomatoes, oregano, pepperoni');
    }

    mix() {
      console.log('Mixing with bare hands');
    }

    cook() {
      console.log('Cooking on the stone')
    }
  }

  class PieCooking extends Cooking {
    prepare() {
      console.log('Preparing flour, apples, sugar, lemon juice');
    }

    mix() {
      console.log('Mixing with a mixer');
    }

    cook() {
      console.log('Cooking in the oven')
    }
  }


  // Client code
  const pizzaCooking = new PizzaCooking();
  pizzaCooking.followRecipe();              // Preparing dough, tomatoes, oregano, pepperoni
                                            // Mixing with bare hands
                                            // Cooking on the stone

  const pieCooking = new PieCooking();
  pieCooking.followRecipe();                // Preparing flour, apples, sugar, lemon juice
                                            // Mixing with a mixer
                                            // Cooking in the oven
}
