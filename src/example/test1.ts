import { injectable } from "../main/Injectable";

class Hoge {
  call() {
    console.log("hoge");
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

console.log(container);
