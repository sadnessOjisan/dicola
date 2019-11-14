import { injectable } from "../main/Injectable";
import "reflect-metadata";
import Container from "../main/Container";

class Hoge {
  call() {
    console.log("hogeeeeeeeeee");
  }
}

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

const container = Container.getInstance();
const foo = container.resolve(Foo);
console.log(new foo.fuga.hoge().call());
