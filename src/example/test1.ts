// so many nest example

import { injectable } from "../main/Injectable";
import "reflect-metadata";
import Container from "../main/Container";

class A {
  call() {
    console.log("hogeeeeeeeeee");
  }
}

@injectable()
class B {
  a: A;

  constructor(a: A) {
    this.a = a;
  }
}

@injectable()
class C {
  b: B;

  constructor(b: B) {
    this.b = b;
  }
}

@injectable()
class D {
  c: C;

  constructor(c: C) {
    this.c = c;
  }
}

@injectable()
class E {
  d: D;

  constructor(d: D) {
    this.d = d;
  }
}

const container = Container.getInstance();
const e = container.resolve(E);
e.d.c.b.a.call();
