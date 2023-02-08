
// fns： 单一参数的函数数组
export function compose(...fns: Function[]): Function {
    return fns
        .reverse()
        .reduce((prevFn, currFn) => (arg: any) => currFn(prevFn(arg)));
}


