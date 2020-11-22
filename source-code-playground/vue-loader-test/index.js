const loaderUtils = require('loader-utils')
const VueTemplateCompiler = require('vue-template-compiler')

module.exports = source => {
    const name = loaderUtils.getOptions(this)

    const result = VueTemplateCompiler.compile(source)

    console.log('========== vue-loader-test ==========')

    return result.render  // 同步返回方式 2
}