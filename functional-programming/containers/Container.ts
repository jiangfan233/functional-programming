import { type OneArgFn as Fn, type Functor, map, printRes, FunctorClass } from "./index"

class Container<T extends any> extends FunctorClass<T>{
  constructor(value: any) {
    super(value);
  }

  
  map(fn: Function) {
    return Container.of(fn(this.value))
  }

  static of<T>(x: T): Container<T> {
    return new Container(x);
  }

  @printRes
  inspect() {
    if(this.value instanceof FunctorClass) {
      return `ID{ value: ${this.value.inspect()} }`;
    } else {
      return `ID{ value: ${this.value} }`;
    }
  }

}

export const Identity = Container;
export const Just = (x: any) => Container.of(x).inspect();

// Container.of(10).map((x: number) => x * 2)

// map((a: number) => a + 6), Container.of(18)


// Container.of(Container.of(789)).inspect()