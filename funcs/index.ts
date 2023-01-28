type ZipCallback<T, K, L extends any> = (l: K, r: L) => T;
type Fn<T, K extends any> = (item: T, index: number, arr: T[]) => K[];


declare interface Array<T> {
  concatMap(fn: Fn<T, any>): any[];
  zip<K, L extends any>(left: K[], right: L[], fn: ZipCallback<T, K, L>): T[]
}

Array.prototype.concatMap = function (fn: Fn<any, any>) {
  return this.map(fn).flat();
}


Array.prototype.zip = function <T, K, L extends any>(left: K[], right: L[], fn: ZipCallback<T, K, L>) {
  const ans: T[] = [];
  let i = 0;
  while (i < left.length && i < right.length) {
    ans.push(fn(left[i], right[i]))
    i++;
  }
  return ans;
}

let left:string[] = ["sda", "231"];
let right :number[] = [1,2,3,4];


console.log(Array.prototype.zip(left, right, (l, r) => `${l} --- ${r}`));
