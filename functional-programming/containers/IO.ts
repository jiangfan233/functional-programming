import { Functor, FunctorClass, OneArgFn, printRes } from ".";
import { compose } from "../compose";

export class IO<T extends Function> extends FunctorClass<T> {
  static of(x: any) {
    return new IO(() => x);
  }

  value: T;
  constructor(fn: T) {
    super(fn);
  }

  @printRes
  map<P, Q extends any>(fn: OneArgFn<P, Q>) {
    return new IO(compose(fn, this.value)) as Functor<Function>;
  }

  chain<K extends unknown>(f: Function): Functor<K> {
    return new IO(compose(f, this.value)).join() as Functor<K>;
  }

  inspect() {
    return `IO{ ${this.value.call(null)} }`;
  }
}
