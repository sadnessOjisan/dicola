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
    console.log("resolve");

    return new target(...tokens);
  }

  public register(constructorToken: string) {
    console.log("register");
    this.data.set(constructorToken, "");
  }
}
