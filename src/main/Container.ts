type constructor<T> = {
  new (...args: any[]): T;
};

/**
 * DI Container is a Singleton.
 */
class Container {
  private static instance: Container;

  // keyにconstructor
  data: Map<any, any[]>;
  context: Map<any, any>;

  private constructor() {
    this.data = new Map<any, any>();
    this.context = new Map<any, any>();
  }

  static getInstance() {
    if (!Container.instance) {
      Container.instance = new Container();
      // ... any one time initialization goes here ...
    }
    return Container.instance;
  }

  public resolve(ctor: constructor<any>) {
    console.log("ctor", ctor);
    const dependantClasses = this.data.get(ctor);
    console.log("dependantClasses", dependantClasses);
    if (dependantClasses) {
      dependantClasses.forEach(cls => {
        this.resolveConstructor(ctor, cls);
      });
    } else {
      console.log("no");
    }
  }

  public resolveConstructor(ctor: constructor<any>, cls: any) {
    console.log(ctor);
    console.log(cls);
    console.log(this.data);
    const depend = this.data.get(cls);
    if (depend) {
      this.resolve(depend[0]);
    } else {
      console.log("this.context", this.context);
      const instanceCache = this.context.get(ctor);
      if (instanceCache) {
        const instance = new cls(instanceCache);
        this.context.set(ctor, instance);
        return this.resolve(cls);
      } else {
        const instance = new cls();
        this.context.set(ctor, instance);

        return this.resolve(ctor);
      }
    }
  }

  public register(constructorToken: any, depend: any) {
    this.data.set(constructorToken, depend);
  }
}

export default Container;
