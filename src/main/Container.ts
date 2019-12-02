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

  static getInstance() {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public resolve(ctor: constructor<any>) {
    const dependantClasses2 = this.data.get(ctor);
    if (!dependantClasses2) {
      console.log("SEEEEEEEEEEEEET");
      const instance = new ctor();
      console.log("instance", instance);
      this.context.set(ctor, instance);
    }
    console.log("dataaaaaaaa", this.data);
    console.log("contexttttttt", this.context);
    console.log(dependantClasses2);
    this.resolveInstance(ctor);
    const dependantClasses = this.data.get(ctor);
    if (!dependantClasses) return;
    const instances = dependantClasses.map(cls => this.context.get(cls));
    return new ctor(...instances);
  }

  private resolveInstance(ctor: any) {
    const depends = this.data.get(ctor);
    if (!depends) return;
    const dependInstances = depends.map(d => new d());
    this.resolve(depends[0]);
    console.log("dependInstances2", dependInstances);
    console.log("ctor", ctor);
    const instance = new ctor(...dependInstances);
    console.log("instance", instance);
    this.context.set(ctor, instance);
  }

  public register(constructorToken: any, depend: any) {
    this.data.set(constructorToken, depend);
  }
}

export default Container;
