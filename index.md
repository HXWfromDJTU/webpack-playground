### plugin

plugin 的通用[参数文档](https://github.com/jantimon/html-webpack-plugin#options)

## webapck 性能优化

## 概念
    一个文件入口 被理解为一个 chunk

### 开发环境
* 优化打包构建速度 (HMR)
    热模块替换，单个模块发生了变化，只会重新打包这一个模块，而不是打包所有模块     
    可以极大提升构建速度     
* 优化代码调试 (source-map)
    * 源代码到构建后代码的映射技术
    * 使用 Rule.oneOf 令每一个文件的打包初见简化，不用都过一遍所有的规则 https://webpack.js.org/configuration/module/#ruleoneof

### 生产环境
* 打包速度要快     
    * 资源缓存：
        * 强制更新: 使用 【hash: 8】 【chunkhash: 12】【contenthash: 12】
    * tree shaking
        * 1. 使用 ES 6 Module （import 与 export）
        * 2. 开启 production环境
        * 3. 修改 @babel/presets 的默认行为打包 CommonJS 为 ESModule
        * 4. package.json 中 设置 sideEffect 确保文件不会被 tree-shaking
        * 参考官方文档 [文档](https://webpack.docschina.org/guides/tree-shaking/)
    * 代码分割
        * 设置多入口
* 优化代码运行的性能    