import { injectable } from "../main/Injectable";
import "reflect-metadata";
import Container from "../main/Container";

class Hoge {
  call() {
    console.log("hogeeeeeeeeee");
  }
}

new Hoge().call();

// simple example

@injectable()
class Fuga {
  hoge: Hoge;

  constructor(hoge: Hoge) {
    this.hoge = hoge;
  }
}

@injectable()
class Foo {
  fuga: Fuga;

  constructor(fuga: Fuga) {
    this.fuga = fuga;
  }
}

@injectable()
class Piyo {
  foo: Foo;

  constructor(fuga: Foo) {
    this.foo = fuga;
  }
}

@injectable()
class Bar {
  piyo: Piyo;

  constructor(piyo: Piyo) {
    this.piyo = piyo;
  }
}

const container = Container.getInstance();
const bar = container.resolve(Bar);
console.log(bar);
bar.piyo.foo.fuga.hoge.call();
