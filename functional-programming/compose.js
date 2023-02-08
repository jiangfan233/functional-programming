"use strict";
exports.__esModule = true;
exports.compose = void 0;
// fns： 单一参数的函数数组
function compose() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return fns
        .reverse()
        .reduce(function (prevFn, currFn) { return function (arg) { return currFn(prevFn(arg)); }; });
}
exports.compose = compose;
