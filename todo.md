# lerna 

[五个小提示](https://medium.com/shopback-engineering/5-tips-about-lerna-4186840093f2)
[教程](https://medium.com/hy-vee-engineering/creating-a-monorepo-with-lerna-yarn-workspaces-cf163908965d)

### TODO
- 需要测试用例进行单元测试
- [接入storebook]
- [react]



### 问题总结
- 为什么webpack不支持esm模式的打包？
    webpack5中可能会支持
    [原因以及plugin](https://paultavares.wordpress.com/2018/07/02/webpack-how-to-generate-an-es-module-bundle/)
    [webpack和plugin对比](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c)
- [ts + rollup 总结](https://hackernoon.com/building-and-publishing-a-module-with-typescript-and-rollup-js-faa778c85396)
-  rollup plugin 需要注意顺序
- peerDependencies 发布后才有效的样子，本地的时候需要本地安装到devDependencies
- .babelrc不会载入了..
- 为什么安装之后的node_modules空荡荡？ lerna将依赖移到了根目录下，然后具体的包增加了软链
- jest需要babel 判断是否为test环境，然后取消module: false
    - [babel-core的问题](https://github.com/facebook/jest/issues/4891#issuecomment-452335622)
    - .vue和typescript需要babel-jest和vue-jest支，ts需添加：allowJs
    - 至少有一个test(it)
- generate type file => tsc --declaration xx.ts
