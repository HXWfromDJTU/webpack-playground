const loaderUtils = require('loader-utils')
const VueTemplateCompiler = require('vue-template-compiler')

module.exports = source => {
    const name = loaderUtils.getOptions(this)

    const result = VueTemplateCompiler.compile(source)

   return result  // 同步返回方式 2
}