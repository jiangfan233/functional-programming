"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = void 0;
function curry(fn, argsNum) {
    if (argsNum === void 0) { argsNum = fn.length; }
    return function nextCurry() {
        var prevArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            prevArgs[_i] = arguments[_i];
        }
        return function () {
            var currArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                currArgs[_i] = arguments[_i];
            }
            var args = __spreadArray(__spreadArray([], prevArgs, true), currArgs, true);
            return args.length < argsNum ? nextCurry.apply(void 0, args) : fn.apply(void 0, args);
        };
    }();
}
exports.curry = curry;
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
