import { curry } from "../curry";
import { Identity, Just } from "./Container";
import { printRes, Functor, OneArgFn, FunctorClass } from ".";

export class Maybe<T extends any> extends FunctorClass<T> {
  constructor(x: T) {
    super(x);
  }

  static of(x: any) {
    return new Maybe(x);
  }

  get isNothing() {
    return this.value === undefined || this.value === null;
  }

  map(fn: Function) {
    return this.isNothing ? this : Maybe.of(fn(this.value));
  }

  inspect() {
    return `${Just(this.isNothing ? "Nothing" : this.value)}`;
  }
}

export const maybe = curry(
  <T, K extends any>(
    msg: string,
    f: OneArgFn<T, K>,
    m: Maybe<T>
  ): K | string => {
    if (m.isNothing) {
      return msg;
    }
    return f(m.value);
  }
);

const match = curry((reg: RegExp, str: string) => str.match(reg));

// Maybe.of("The world is a vampire.").map(match(/a/ig))
// Maybe.of("1").map(x => x)

// Maybe.of(1).inspect();
// Maybe.of(Maybe.of("nest")).inspect();
// Maybe.of(Maybe.of("nest")).chain().inspect();
