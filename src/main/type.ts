type constructor<T> = {
  new (...args: any[]): T;
};

export type InjectionToken<T = any> = constructor<T> | string | symbol;

export type Dictionary<T> = {
  [key: string]: T;
};
