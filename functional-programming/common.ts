import { curry } from "./curry";


export const reduce = curry((fn, arr) => arr.reduce(fn));

export const chain = curry((fn, monad) => monad.chain(fn));

export const trace = curry((tag: any, x: any) => {
  console.log(tag, x);
  return x;
})


export const intercalate = curry((s: string, arr: any[]) => {
  return arr.join(s);
})


export const toUpperCase = curry(function (s: string) {
  return s.toUpperCase();
})

export const head = curry(function (arr: any[] | string) {
  return arr[0];
})

export const split = curry(function (c: string, str: string) {
  return str.split(c);
})

export const map = curry(function (fn: Function, arr: any) {
  return arr.map(fn);
})

export const replace = curry(function (src: RegExp | string, target: string, str: string) {
  return str.replace(src, target);
})

export const tirm = curry(function (s: string) {
  return s.trim();
})