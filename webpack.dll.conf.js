const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    entry: {
        jquery: ['jquery'],
        vue: ['vuetify', 'vue', 'vue-router', 'vuex']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dll'),
        library: '[name]_[hash:5]', // 
        libraryTarget: 'window' // library对外暴露的方式
    },
    plugins: [
        new CleanWebpackPlugin(), // 用于在下一次打包时清除之前打包的文件
        // Dynamic Link Libray 动态链接库， 用于生成 manifest.json  ===> 提供和 jQuery 映射
        new webpack.DllPlugin({
            name: '[name]_[hash:5]',
            context: __dirname,
            path: path.resolve(__dirname, 'dll/manifest.json')
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 8899
        })
    ]
}