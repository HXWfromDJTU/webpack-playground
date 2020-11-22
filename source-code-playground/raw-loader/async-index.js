const loaderUtils = require('loader-utils')


module.exports = source => {
    const name = loaderUtils.getOptions(this) // 获取传入的参数
    const asyncCallback = this.async(); // 获取异步回调的方法

    this.cacheable(false) // 关闭缓存

    const json = JSON.stringify(source)
                    .replace(/\u2028/g, '\\u2028')
                    .replace(/\u2029/g, '\\u2029')
                    .replace('content to be replaced', 'content has been replaced');

    console.log('async raw loader param - name ====== ', name)

    const result = 'test result'

    // 模拟一个十分耗时的操作
    setTimeout(() => {
       asyncCallback(null, result)
    }, 3000)
}