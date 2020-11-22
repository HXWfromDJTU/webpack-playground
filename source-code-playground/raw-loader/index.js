const loaderUtils = require('loader-utils')

module.exports = source => {
    const name = loaderUtils.getOptions(this)

    console.log('======= raw loader ====== ', name)

    return `export default ${source}` // 同步返回方式 1
}