import MyPlugin from './my-plugin'

const webpackConfig = {
    plugins: [
        new MyPlugin()
    ]
}

for (const plugin of webpackConfig.plugins) {
    if (typeof plugin === 'function') {
        plugin.call(compiler, compiler)
    } else {
        plugin.apply(compiler)
    }
}

compiler.run()