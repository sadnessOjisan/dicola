// can take multiple dependant.

import { injectable } from "../main/Injectable";
import "reflect-metadata";
import Container from "../main/Container";

class Hoge {
  call() {
    console.log("hogeeeeeeeeeeee");
  }
}

class Piyo {
  call() {
    console.log("piyooooooooooooo");
  }
}

@injectable()
class Fuga {
  hoge: Hoge;
  piyo: Piyo;

  constructor(hoge: Hoge, piyo: Piyo) {
    this.hoge = hoge;
    this.piyo = piyo;
  }
}

@injectable()
class Foo {
  fuga: Fuga;

  constructor(fuga: Fuga) {
    this.fuga = fuga;
  }
}

const container = Container.getInstance();
const foo = container.resolve(Foo);
foo.fuga.hoge.call();
foo.fuga.piyo.call();
