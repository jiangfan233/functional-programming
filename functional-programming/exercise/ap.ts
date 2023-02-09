import { Functor } from "../containers";
import { Identity } from "../containers/Container";
import { Maybe } from "../containers/Maybe";
import { curry } from "../curry";

const add = curry((a: number, b: number) => a + b);

Identity.of(2)
  .chain((two: number) => Identity.of(3).map(add(two)))
  .inspect();
Identity.of(2)
  .map((x: number) => x + 3)
  .inspect();

// Identity.of(add(4)) 是一个pointed funtor，里面已经有数据了
Identity.of(add(4)).ap(Identity.of(9)).inspect();

const liftA2 = curry((g: Function, f1: Functor<any>, f2: Functor<any>) => {
  return f1.map(g).ap(f2);
})

Identity.of(5).map(add).ap(Identity.of(10)).inspect();
Maybe.of(add).ap(Maybe.of(11)).ap(Maybe.of(55)).inspect();

const safeAdd = (a: undefined | number, b: undefined | number) => {
  return Maybe.of(a !== undefined ? add(a) : () => a).ap(Maybe.of(b));
  // return Maybe.of(add)
  //   .ap(Maybe.of(a))
  //   .chain((x: undefined | Function) => Maybe.of(b).map(() => x));

};

// safeAdd(111, 2).inspect();

safeAdd(undefined, 1).inspect();
