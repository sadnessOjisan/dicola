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

  public resolve(tokens: any) {
    const instance = this.getInstance(tokens);
    console.log(instance);
    return new tokens(...tokens);
  }

  public getInstance(c: any) {
    const instance = this.data.get(c);
    return instance;
  }

  public register(constructorToken: any, depend: any) {
    this.data.set(constructorToken, depend);
  }
}

export default Container;
