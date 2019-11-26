# lerna 

[五个小提示](https://medium.com/shopback-engineering/5-tips-about-lerna-4186840093f2)
[教程](https://medium.com/hy-vee-engineering/creating-a-monorepo-with-lerna-yarn-workspaces-cf163908965d)


###  问题
- 为什么安装之后的node_modules空荡荡？ lerna将依赖移到了根目录下，然后具体的包增加了软链

### TODO
- 在参考参考别人的想法
- 只需要打包了吧？目前看来是不需要dev模式的 使用make进行封装
- 需要测试用例进行单元测试
- 接入ts
- 增加自动化格式 如果未通过[lint-staged](https://github.com/okonet/lint-staged)，则取消这次commit
- 规范你的commit message 并根据commit 自动生成 changelog
- 接入storebook？



### 问题总结
- 为什么webpack不支持esm模式的打包？
    webpack5中可能会支持
    [原因以及plugin](https://paultavares.wordpress.com/2018/07/02/webpack-how-to-generate-an-es-module-bundle/)
    [webpack和plugin对比](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c)
- [ts + rollup 总结](https://hackernoon.com/building-and-publishing-a-module-with-typescript-and-rollup-js-faa778c85396)
-  rollup plugin 需要注意顺序
- peerDependencies 发布后才有效的样子，本地的时候需要本地安装到devDependencies
- .babelrc不会载入了..


### todo
- [react]
- css [only]
- __test__
- 进度插件和删除插件 [其他]
- 引入的三方模块依然遭到ts的提示 ts搞起来好复杂的样子