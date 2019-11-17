import { constructor } from "./type";

/**
 * DI Container is a Singleton.
 */
class Container {
  private static instance: Container;

  // key is constructor
  data: Map<constructor<any>, constructor<any>[]>;
  context: Map<constructor<any>, InstanceType<constructor<any>>>;

  private constructor() {
    this.data = new Map<constructor<any>, constructor<any>[]>();
    this.context = new Map<any, InstanceType<constructor<any>>>();
  }

  static getInstance() {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public resolve(ctor: constructor<any>) {
    console.log("this.data", this.data);
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
      return arg;
    } else {
      this.context.set(ctor, new ctor());
    }
  }

  private resolveInstance(cls: any) {
    const instanceCache = this.context.get(cls);
    if (instanceCache) {
      return this.resolve(cls);
    } else {
      const depends = this.data.get(cls);
      if (depends) {
        const dependInstances = depends.map(d => new d());
        this.resolve(depends[0]);
        const instance = new cls(...dependInstances);
        this.context.set(cls, instance);
      } else {
        const instance = new cls();
        this.context.set(cls, instance);
      }
    }
  }

  public register(constructorToken: any, depend: any) {
    this.data.set(constructorToken, depend);
  }
}

export default Container;
