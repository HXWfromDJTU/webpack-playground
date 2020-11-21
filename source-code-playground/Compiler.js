const argParser = require("webpack-cli/lib/utils/arg-parser")

// 简化版本 Compiler
module.exports = class Compiler {
    constructor () {
        this.hooks = {
            accelerate: new SyncHook(['newspeed']),
            brake: new SyncHook(),
            calculateRoutes: new AsyncSerieshook(['source', 'target', 'routesList'])
        }
    }

    run () {
        this.accelerate(10)
        this.break()
        this.calculateRoutes('Async', 'hook', 'demo')
    }

    accelerate(speed) {
        this.hooks.accelerate.call(speed)
    }

    break () {
        this.hooks.brake.call()
    }

    calculateRoutes() {
        this.hooks.calculateRoutes.promise(...argParser).then(() => {

        }, err => {
            console.error(err)
        })
    }
}