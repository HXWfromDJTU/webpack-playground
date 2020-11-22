const Compiler = require('./Compiler')


export default class MyPlugin {
    constructor () {

    }

    apply (compiler) {
        compiler.hooks.brake.tap('WarningLangPlugin', () => {
            console.log('WarningLangPlugin')
        })

        compiler.hooks.accelerate.tap('LoggerPlugin', newSpeed => {
            console.log('newSpeed:', newSpeed)
        })

        compiler.hooks.calculateRoutes.tap('calculateRoutes tapAsync', (source, target, routesList) => {
            return new Promise((resolve, reject) => {
                setTimeout(()=> {
                    console.log(`tapPromise to ${source} ${target} ${routesList}`)
                    resolve()
                }, 1000)
            })
        })
    }
}