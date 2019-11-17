# dicola

DI COntainer 4 Layered Architecture

## install

```
npm install dicola reflect-metadata --save
```

You should configure tsconfig.json.

```
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

## For developer

If you meke PR, please checkout `feature/**` and set target to `master`. Please follow [Github Flow](https://guides.github.com/introduction/flow/)

### setup

setup library

```
$ yarn install
```

check example

```
$ yarn run dev:watch
```

## FYI

- https://nehalist.io/dependency-injection-in-typescript/
