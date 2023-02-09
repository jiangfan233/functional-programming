import { curry } from "../curry";

export interface OneArgFn<T, K extends any> extends Function {
  (x: T): K;
}

export type FunctorMap = <T, K extends any>(fn: OneArgFn<T, K>) => Functor<K>;

export interface Functor<T extends any> {
  value: T;

  chain(f: Function): Functor<T>;
  map<K extends any>(fn: Function): Functor<K>;
  join(): Functor<T> | T;
  inspect(): string;
  ap(functor: Functor<any>): Functor<any>;
}

export abstract class FunctorClass<T extends any> implements Functor<T> {
  abstract map<K extends unknown>(fn: Function): Functor<K>;
  abstract inspect(): string;

  value: T;
  constructor(x: T) {
    this.value = x;
  }

  // 单子就是可以被展开的有值函子 --> 维度减少一维
  // Monads are pointed funtors that can be flatten.
  join() {
    return this.value instanceof FunctorClass ? this.value : this;
  }

  chain(f: Function): Functor<T> {
    return this.map(f).join() as Functor<T>;
  }

  // F.of(x).map(f) === F.of(f).ap(F.of(x))
  ap(functor: Functor<any>) {
    return functor.map(this.value as Function);
  }
}

export const printRes = <T, Q extends any>(target: T, prop: string) => {
  const func = target[prop] as FunctorMap;

  function overWrite<P extends any>(fn?: OneArgFn<P, T>) {
    // 这里的target是未实例化的target,
    // 需要使用this指向调用该函数（overWrite）的实例
    // console.log("this", this, target)
    const res: Q = func.call(this, fn);
    console.log(res);
    return res;
  }
  target[prop] = overWrite as T[keyof T];
  return overWrite as Q | TypedPropertyDescriptor<(fn: Function) => T>;
};

export const map = curry(
  <T, K extends any>(f: OneArgFn<T, K>, functor: Functor<T>) => functor.map(f)
);

export const chain = curry(<T>(f: Function, functor: Functor<T>) =>
  functor.chain(f)
);
