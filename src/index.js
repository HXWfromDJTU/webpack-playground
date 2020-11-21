import data from '../static/data.json';
import Vue from 'vue';
import $ from 'jquery';

// 字体样式入口
import '../static/font/iconfont.css';

// 图片文件打包
import '../static/imgs/nexttick_cover.png';
import '../static/imgs/woman.jpeg';
import '../static/imgs/man.png';

// 样式文件包
import './style/index.scss';

// 测试 treeShaking
import { add } from './helper';

// 测试 JavaScript 代码转换测试

// import '@babel/polyfill'; // 粗暴地直接引入整个 polyfill 会导致 JavaScript 体积过大

const testEs6 = 123;
const promiseTest = new Promise((resolve) => {
    setTimeout(() => {
        console.log('promise resolve');
        resolve();
    });
});

// 使用 ES7 动态引入模块，客观效果可以实现 code-spliting
import('./constant')
    .then(moduleConstant => {
        console.log('APP_VERSION', moduleConstant.APP_VERSION)
    })
    .catch(err => {
        console.log('APP_VERSION Loaded Failed')
    })

document.getElementById('btn').onclick = () => {
    // webpackPrefetch: true  设置允许webapck 将资源使用 <link rel="prefetch" href="xxxxx" /> 进行加载 
    import(
        /* webpackPrefetch: true */
        './utils').then(utils => {
            utils.combine(1, 2)
        })
}


// 测试 treeShaking
console.log(add(1, 2, 4));

console.log(data, testEs6, promiseTest);


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js') // service-worker.js 会由 workbox-webpack-plugin 生成
        .then(() => {
            console.log('sw 注册成功')
        })
        .catch(() => {
            console.log('sw 注册失败')
        })
    })
}

console.log(Vue, $)
