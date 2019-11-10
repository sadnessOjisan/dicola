/**
 * DI Container is a Singleton.
 */
class Container {
  private static instance: Container;

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

  public resolve() {
    console.log("resolve");
  }
}
