// https://juejin.im/entry/5907f5020ce46300617bfb44 如何编写一个声明文件
declare module 'ofa-vites' {
    export function getFp(): Promise<string>;
    export function getFcp(): Promise<string>;
}
