const {runLoaders} = require('loader-runner')
const path = require('path')
const fs = require('fs')


runLoaders({
    resource: path.resolve(__dirname, '../assets/index.vue'), // 指明要处理的文件
    loaders: [
        {
            loader: path.resolve(__dirname, './index.js'), // 制定用于处理的loader
            options: {
                name: 'test test test test'
            }
        },
    ],
    context: {
        minimize: true,
    },
    readResource: fs.readFile.bind(fs)
}, (err, result) => {
    if (err) {
        console.error(err)
    } else {
        console.log(result)
    }
})