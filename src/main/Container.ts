import { constructor } from "./type";

/**
 * DI Container is a Singleton.
 */
class Container {
  private static instance: Container;

  // key is constructor
  data: Map<constructor<any>, constructor<any>[]>;
  context: Map<constructor<any>, constructor<any>>;

  private constructor() {
    this.data = new Map<constructor<any>, constructor<any>[]>();
    this.context = new Map<any, InstanceType<constructor<any>>>();
  }

  // this container is singleton.
  static getInstance() {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  // resolve dependency
  public resolve(ctor: constructor<any>) {
    const dependantClasses2 = this.data.get(ctor);
    if (dependantClasses2 && dependantClasses2.length > 0) {
      const instance = new ctor();
      this.context.set(ctor, instance);
    }
    this.resolveInstance(ctor);
    const dependantClasses = this.data.get(ctor);
    if (!dependantClasses) return;
    const instances = dependantClasses.map(cls => this.context.get(cls));
    return new ctor(...instances);
  }

  // take a instance
  private resolveInstance(ctor: any) {
    const depends = this.data.get(ctor);
    if (!depends) {
      const i = new ctor();
      this.context.set(ctor, i);
      return;
    }
    this.resolve(depends[0]);
    const dependInstances = depends.map(d => {
      return this.context.get(d);
    });

    const instance = new ctor(...dependInstances);
    this.context.set(ctor, instance);
  }

  // register dependency
  public register(constructorToken: any, depend: any) {
    this.data.set(constructorToken, depend);
  }
}

export default Container;
