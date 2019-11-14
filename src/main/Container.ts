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
    }
    return Container.instance;
  }

  public resolve(ctor: constructor<any>) {
    console.log("this.context", this.context);
    this.resolveInstance(ctor);
    const dependantClasses = this.data.get(ctor);
    if (dependantClasses) {
      let isInstantbale = false;
      dependantClasses.forEach(cls => {
        if (this.context.get(cls)) {
          isInstantbale = true;
        }
      });

      if (isInstantbale) {
        const instances = dependantClasses.map(cls => this.context.get(cls));
        return new ctor(...instances);
      }

      dependantClasses.forEach(cls => {
        const instance = this.context.get(cls);
        if (instance) {
          return new ctor(instance);
        } else {
          this.resolveInstance(cls);
        }
      });

      const arg = this.context.get(ctor);
      console.log("arg", arg);
      return arg;
    } else {
      this.context.set(ctor, new ctor());
      console.log("no depend");
    }
  }

  private resolveInstance(cls: any) {
    const instanceCache = this.context.get(cls);
    if (instanceCache) {
      const instance = new cls(instanceCache);
      console.log("clsssss", cls);
      return this.resolve(cls);
    } else {
      const depends = this.data.get(cls);
      console.log(0);
      console.log("depends", depends);
      if (depends) {
        this.resolve(depends[0]);
        // TODO: 複数受け取れるようにしたいよね
        const instance = new cls(new depends[0]());
        this.context.set(cls, instance);
        console.log("context", this.context);
        console.log(1);
      } else {
        console.log(2);
        const instance = new cls();
        this.context.set(cls, instance);
        console.log("no depend instance", instance);
      }
    }
  }

  public register(constructorToken: any, depend: any) {
    this.data.set(constructorToken, depend);
  }
}

export default Container;
