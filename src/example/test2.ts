// can revolve via interface

import Container from "../main/Container";
import { injectable } from "../main/Injectable";
import "reflect-metadata"; // 呼び出し側も必要
import { inject } from "../main/inject";

interface IRepository {
  read: () => number[];
  create: (val: number) => void;
}

interface IStoreAdapter {
  read: () => number[]; // in real, should return a DTO.
  create: (val: number) => void;
}

class MemoryStoreImpl implements IStoreAdapter {
  private store: number[] = [];
  read() {
    return this.store;
  }

  create(val: number) {
    this.store.push(val);
  }
}

@injectable()
class DBRepositoryImpl implements IRepository {
  adapter: IStoreAdapter;

  constructor(@inject(MemoryStoreImpl) adapter: IStoreAdapter) {
    this.adapter = adapter;
  }

  read() {
    return this.adapter.read();
  }

  create(val: number) {
    this.adapter.create(val);
  }
}

@injectable()
class APIRepositoryImpl implements IRepository {
  read() {
    console.log("get data");
    return [1, 2, 3];
  }

  create(val: number) {
    console.log("post data");
  }
}

@injectable()
class Service {
  repo: IRepository;

  // repositoryが2つあるがどうするか？がミソ
  constructor(@inject(DBRepositoryImpl) repo: IRepository) {
    this.repo = repo;
  }

  public find() {
    return this.repo.read();
  }

  public save(val: number) {
    this.repo.create(val);
  }
}

// interface test

const container = Container.getInstance();
const service = container.resolve(Service);
console.log(service);
service.save(1);
service.save(2);
const data = service.find();
console.log("the value: ", data);
