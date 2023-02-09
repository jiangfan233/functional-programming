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

 
  map<P, Q extends any>(fn: OneArgFn<P, Q>) {
    return new IO(compose(fn, this.value)) as Functor<Function>;
  }

  @printRes
  inspect() {
    return `IO{ ${this.value.call(null)} }`;
  }
}
