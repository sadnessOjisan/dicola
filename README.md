# dicola

DI COntainer 4 Layered Architecture.

This DI Container is for Clean Archetechture. Only support single depency direction.

Is it a useless? Yes, I think so. But it provides DI Container with so tiny bundle size.

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

## how to use

please show [examples](https://github.com/sadnessOjisan/dicola/tree/master/src/example).

public API is `@injectable()`, `@inject(${className/Symbol})`, `Container.getInstance().resolve(${Constructor})`.

(dicola provide a singleton container.)

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
