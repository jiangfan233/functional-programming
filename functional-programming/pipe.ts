export function pipe(...fns: Function[]): Function {
    return fns.reduce((prevFn, currFn) => (x :any) => currFn(prevFn(x)))
}