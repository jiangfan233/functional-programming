export function curry(fn :Function, argsNum = fn.length) {
    return function nextCurry(...prevArgs :any[]) {
        return function(...currArgs :any[]) {
            const args = [...prevArgs, ...currArgs];
            return args.length < argsNum ? nextCurry(...args) : fn(...args);
        }
    }();
}




// const log = (a :any) => console.log(a);
// const add2 = (a:number, b: number) => a+b;
// const add3 = (a:number, b: number, c:number) => a+b+c;
// const addMany = (...args: number[]) => args.reduce((prev, curr) => prev + curr);

// // curry(log)("ahh");

// const test2 = curry(add2);
// console.log(test2(2)(3));

// const test3 = curry(add3);
// console.log(test3(1)(2)(3));
// console.log(test3(1,2)(3));
// console.log(test3(1,2,3));

// const testMany = curry(addMany);
// console.log(testMany(10), testMany(10,20,30));
