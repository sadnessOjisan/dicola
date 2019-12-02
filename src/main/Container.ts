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
    this.resolveInstance(ctor);
    const dependantClasses = this.data.get(ctor);
    if (!dependantClasses) return;
    const instances = dependantClasses.map(cls => this.context.get(cls));
    return new ctor(...instances);
  }

  private resolveInstance(cls: any) {
    const depends = this.data.get(cls);
    if (!depends) return;
    const dependInstances = depends.map(d => new d());
    this.resolve(depends[0]);
    const instance = new cls(...dependInstances);
    this.context.set(cls, instance);
  }

  public register(constructorToken: any, depend: any) {
    this.data.set(constructorToken, depend);
  }
}

export default Container;
