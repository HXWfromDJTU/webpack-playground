/**
 * webpacl.config.js
 * webpack配置文件默认使用 commonjs
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',

    entry: path.join(__dirname, '/src/index.js'),


    output: {
        filename: 'built.js',
        // '__dirname' 表示当前目录的绝对路径
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/',
    },
    // 配置loader 记性功能拓展
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            // use 中的执行顺序是从后往前
            use: [
                'style-loader', // 创建 style 标签 将 js 中的样式资源进行插入，添加到headzhong 
                'css-loader', // 将 css文件中的内容变为字符串， 并且用 commonjs 模块包裹住
                'sass-loader', // 若不及啊这个laoder也可以打包成功，但是不会按照预期处理了 sass 语法
            ]
        },
        {
            test: /\.(png|jpe?g|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 2 * 1024, // 限制图片大小小于 2kb, 若大于此值则被处理为 base64编码
                esModule: false, // url laoder默认使用 esModuel 进行模块化，而搭配的 html loader 是commonjs, 统一配置进而匹配
                name: '[hash:10].[ext]' // 设置文件的格式 [hash:10] 表示出现10位的随机字符串 [ext]表示拓展名
            }
        },
        {
            exclude: /\.(css|scss|js|html|png|jpe?g|gif)/, // 排除已经处理过的资源，剩下的资源原封不动迁移过去
            loader: 'file-loader'
        },
        // {
        //     test: /\.html$/i,
        //     loader: 'html-loader', // 处理 html 文件中的es6模块化，使用commonjs进行解析
        // }
      ]
    },
    // plugin 是拓展功能，是额外的模块，需要下载后引入再进行使用
    // 对于每一个插件 option 是通用配置 参考文档 https://github.com/jantimon/html-webpack-plugin#options
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new CleanWebpackPlugin()
    ]
}