/**
 * webpack缓存测试服务器
 * npm i nodemon -g nodemon serber.js
 * node server.js
 */

const express = require('express')
const app = express()
const path = require('path')

app.use(
    express.static(path.resolve(__dirname, '../dist'), {
        maxAge: 1000 * 3600
    })
)

app.listen(3000)