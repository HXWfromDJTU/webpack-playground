const pluginName = 'ConsoleOnBuildWebpackPlugin'

class ConsoleOnBuildWebpackPlugin {
    apply(compile) {
        compile.hooks.run.tap(pluginName, compilation => {
            console.log(' ===========  This webpack build progress is started... ===========')
        })
    }
}

module.exports = ConsoleOnBuildWebpackPlugin