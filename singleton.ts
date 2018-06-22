namespace SingletonPattern {
  class AlphaCentauriA {
    private static instance: AlphaCentauriA;

    public name: string;
    public mass: string;
    public radius: string;
    public distance: string;

    private constructor() {}                  // private constructor, can't call new AlphaCentauriA()

    static getInstance(): AlphaCentauriA {    // static method returning a reference to the instance
      if (!AlphaCentauriA.instance) {
        AlphaCentauriA.instance = {           //  lazy initialization
          name: 'HD 128620',
          mass: '1.100 M',
          radius: '1.2234±0.0053 R',
          distance:	'4.37 ly',
        };
      }
      return AlphaCentauriA.instance;
    }
  }

  // Client code
  let star = AlphaCentauriA.getInstance();    // instantiate
  console.log(star.name);                     // 'HD 128620'

  star.name = 'Rigil Kentaurus'

  star = AlphaCentauriA.getInstance();        // try to reinstantiate
  console.log(star.name);                     // 'Rigil Kentaurus'
}
