namespace SingletonPattern {
  class AlphaCentauriA {
    static instance: any;

    public name: string;
    public mass: string;
    public radius: string;
    public distance: string;
    public rename: Function;

    constructor() {
      if (!AlphaCentauriA.instance) {
        AlphaCentauriA.instance = {
          name: 'HD 128620',
          mass: '1.100 M',
          radius: '1.2234±0.0053 R',
          distance:	'4.37 ly',
          rename: newName => AlphaCentauriA.instance.name = newName,
        };
      }
      return AlphaCentauriA.instance;
    }
  }

  // Client code
  let star = new AlphaCentauriA();  // instantiate
  console.log(star.name);           // 'HD 128620'

  star.rename('Rigil Kentaurus');   // rename

  star = new AlphaCentauriA();      // try to reinstantiate
  console.log(star.name);           // 'Rigil Kentaurus'
}
