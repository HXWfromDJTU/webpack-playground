import data from '../static/data.json';

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

// 测试 treeShaking
console.log(add(1, 2, 4));

console.log(data, testEs6, promiseTest);
