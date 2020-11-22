/**
 * webpacl.config.js
 * webpack配置文件默认使用 commonjs
 * 
 * mode {
 *    development: ①着重于本地开发
 *    production:  ①css从JavaScript中提取出来
 *                 ②代码压缩
 *                 ③CSS语法的浏览器兼容
 *                 ④更快更强
 * }
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractplugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { optimize } = require('webpack');
const WorkBoxWebapckPlugin = require('workbox-webpack-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const ConsoleOnBuildWebpackPlugin = require('./custom-plugins/console-log-on-build-webpack-plugin')

const ZipWebpackPlugin = require('./source-code-playground/zip-webpack-plugin')

// 环境判断 package.json script脚本启动的时候使用 corss-env 去设置环境变量
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: isDev ? 'development' : 'production', // 打包环境配置

    entry: path.join(__dirname, '/src/index.js'), // 单入口配置 

    // 多入口配置

    // Array 模式  ==> 最终只会输出一 bundle 文件 (不常用)
    // entry: [path.join(__dirname, '/src/index.js'), path.join(__dirname, '/src/helper/index.js')]

    // Object 模式  ==> 最终会输出多 bundle 文件
    // entry: {
    //     index: path.join(__dirname, '/src/index.js'),
    //     helper: path.join(__dirname, '/src/helper/index.js'),
    // },

    // 数组与对象模式可以组合使用

    output: {
        // [hash] 构建哈希 [chunkhash]文件入口哈希 [contenthash]文件内容哈希 按需进行使用
        // [name] 表示入口模块的名称
        filename: 'js/[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',  // publicPath 值得是所有资源的公共路径的前缀，用于生产环境打包
        chunkFilename: '[name]_chunk.js' // 制定非入口chunk的名称    
    },
    // 配置loader 记性功能拓展
    module: {
        rules: [
            {
                test: /\.(vue)/,
                use: [
                    path.resolve(__dirname, 'source-code-playground/vue-loader-test')  // 使用绝对路径制定 loader  位置
                ]
            },
            {
                test: /\.(js)/,
                use: [
                    path.resolve(__dirname, 'source-code-playground/demo-loader')  // 使用绝对路径制定 loader  位置
                ]
            },
            {
                test: /\.(js|ts|jsx)$/, // 检查范围+
                enforce: 'pre', // 强制优先执行
                exclude: /(node_modules|dist)/, // 检查范围去除
                loader: 'eslint-loader',
                // 建议使用 airbnb 风格指南 https://github.com/airbnb/javascript
                // 在不使用 react 相关的东西时，只用 eslint-config-airbnb-base https://www.npmjs.com/package/eslint-config-airbnb-base 即可
                // 插件依赖顺序 eslint-config-airbnb-base  ==> eslint ==> eslint-plugin-import
                options: {
                    fix: true // 自动修复出现的问题
                }
            },
            /* JavaScript 兼容性处理 babel0loader @babel-loader @babel/core @babel/presets
             * 1. 基本的 JavaScript 兼容性处理，但只可以处理一些基础语法
             * 2. @babel/polyfill 进行全量
             * 3. 按需进行配置，而不是全量进行polyfill。所以使用 core-js
             */
            {
                test: /\.js$/,
                use: [
                    {
                        // 开启多进程打包 但是需要看情况进行使用，不一定比不开启时间好
                        loader: 'thread-loader', 
                        options: {
                            workers: 2 // 指明启用多少个进程进行打包
                        }
                    }, 
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // core-js 的文档 https://babeljs.io/docs/en/babel-core/#options
                                        useBuiltIns: 'entry', //  usage 标明使用按需加载，但与其他选项有冲突，稍后测试
                                        corejs: {
                                            version: 3
                                        },
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            ie: '9',
                                            safari: '10',
                                            edge: '17'
                                        },
                                        modules: false // 启用 ESModule，覆盖其默认的 CommonJS模式，以便 Webpack进行 tree-shaking
                                    }
                                ]
                            ],
                            cacheDirectory: true  // 开启babel缓存，第二次构建的时候，会使用之前的缓存
                        }
                    }
                ],
            },
            {
                oneOf: [  // 标明以下规则中，按顺序只会命中一个，而不做多个文件的检测
                    {
                        test: /\.(scss|css)$/,
                        // use 中的执行顺序是从后往前
                        use: [
                            // 'style-loader', // 创建 style 标签 将 js 中的样式资源进行插入，添加到 HTML 文件的 head标签中 
                            {
                                loader: MiniCssExtractplugin.loader, // 使用 MiniCssExtractplugin 的 loader 提取js中的css文件成单独文件
                                options: {
                                    publicPath: path.resolve(__dirname, 'dist')
                                }
                            },
                            'css-loader', // 将 css文件中的内容变为字符串， 并且用 commonjs 模块包裹住
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        ident: 'postcss',
                                        plugins: () => [
                                            require('postcss-preset-env')() // 规则默认读取 package.json 下的 browserList 配置项。分别配置了开发与正式两种环境
                                        ]
                                    }
                                }
                            },
                            'sass-loader', // 若不加这个laoder也可以打包成功，但是不会按照预期处理了 sass 语法
                        ],
                        // 此处不需要进行 style 文件输出目录的配置，因为都已经打包到了 JavaScript 文件中了
                    },
                    {
                        test: /\.(png|jpe?g|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 2 * 1024, // 限制图片大小小于 2kb, 若大于此值则被处理为 base64编码
                            esModule: false, // url laoder默认使用 esModuel 进行模块化，而搭配的 html loader 是commonjs, 统一配置进而匹配
                            name: '[hash:10].[ext]', // 设置文件的格式 [hash:10] 表示出现10位的随机字符串 [ext]表示拓展名
                            outputPath: 'imgs'
                        }
                    },
                    {
                        exclude: /\.(css|scss|js|html|png|jpe?g|gif)/, // 排除已经处理过的资源，剩下的资源原封不动迁移过去
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    },
                    {
                        test: /\.html$/i,
                        loader: 'html-loader', // 处理 html 文件中的es6模块化，使用commonjs进行解析
                        options: {
                            minimize: true,
                            // publicPath: path.resolve(__dirname, 'dist')
                        }
                    }
                ]
            }
        ]
    },
    // plugin 是拓展功能，是额外的模块，需要下载后引入再进行使用
    // 对于每一个插件 option 是通用配置 参考文档 https://github.com/jantimon/html-webpack-plugin#options
    plugins: [
        // 自动生成html模板
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            minify: {
                collapseWhitespace: true, // 移除空白
                removeComments: true, // 移除注释
            }
        }),
        new MiniCssExtractplugin({
            filename: 'css/[name].[hash:8].css', // 对输出文件的重命名
        }),
        new OptimizeCssAssetsWebpackPlugin(), // 压缩 CSS 文件
        new CleanWebpackPlugin(), // 用于在下一次打包时清除之前打包的文件
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dll/manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, 'dll/jquery.js')
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 8899
        }),
        // 用于创建 service-worker
        // new WorkBoxWebapckPlugin.GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true,
        // })
        new ConsoleOnBuildWebpackPlugin(), // 测试自定义插件
        new ZipWebpackPlugin({
            filename: 'zip/offline'
        }),
    ],
    // 开发服务器 devServer 用来运行自动化
    // 特点: 只会在内存中编译打包，不会有任何的输出
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        // 启动 gzip
        compress: true,
        port: 3001,
        open: true,
        hot: true, // 表示启用了 HMR (hot module replacement), 每次文件更新仅仅 reload 被修改的文件
    },
    /* 前缀修饰
     * source-map 生成 .map 文件
     * eval ===> 表示使用eval 包裹代码
     * cheap ===> 不包含列信息，也不包含 loader 的 source-map
     * module ===> 包含loader的sourcemap
     * inline ===> 将 .map 作为DataURL 嵌入，不单独生成 .map文件
     * 
     * 开发环境
     *    速度快 eval > inline > cheap
     *    建议使用 ===> ① eval-source-map
     *                 ② eval-cheap-module-source-map
     * 生产环境
     *    安全考虑 ===> ① nosources-source-map 全部隐藏
     *                 ② hidden-source-map 只隐藏源代码，会提示构建后代码错误信息
     *    调试友好 ===> ① source-map
     */
    devtool: 'source-map',
    /**
     * 1. 可以将 node_modules 中的代码单独打包成一个chunk最终输出
     * 2. 自动复习多入口的chunk中，若有公共的文件，则会单独打包成一个chunk，不会重复
     */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    // externals: {
    //     jquery: 'jQuery'
    // }
}