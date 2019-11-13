type constructor<T> = {
  new (...args: any[]): T;
};

/**
 * DI Container is a Singleton.
 */
class Container {
  private static instance: Container;

  // keyにconstructor
  data: Map<any, any>;
  context: Map<any, any>;

  private constructor() {
    this.data = new Map<any, any>();
  }

  static getInstance() {
    if (!Container.instance) {
      Container.instance = new Container();
      // ... any one time initialization goes here ...
    }
    return Container.instance;
  }

  public resolve(ctor: any) {
    // console.log(this.data);
    const instance = this.getInstance(ctor);
    if (instance) {
      return new ctor(...instance);
    } else {
      return new ctor();
    }
  }

  public getInstance(ctor: any) {
    const injectClass = this.data.get(ctor);
    console.log(ctor);
    console.log(injectClass);
    if (injectClass) {
      this.resolve(injectClass[0]);
    } else {
      return ctor();
    }
  }

  public register(constructorToken: any, depend: any) {
    this.data.set(constructorToken, depend);
  }
}

export default Container;
