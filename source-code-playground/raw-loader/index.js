const loaderUtils = require('loader-utils')

module.exports = source => {
    const name = loaderUtils.getOptions(this)

    const json = JSON.stringify(source)
                    .replace(/\u2028/g, '\\u2028')
                    .replace(/\u2029/g, '\\u2029')
                    .replace('content to be replaced', 'content has been replaced');

    console.log('raw loader param - name ====== ', name)

    // return `export default ${json}` // 同步返回方式 1
    this.callback(null, json, 'other', 'other2', 'other3')  // 同步返回方式 2
}