import data from '../static/data.json';

// 字体样式入口
import '../static/font/iconfont.css';

// 图片文件打包
import '../static/imgs/nexttick_cover.png';
import '../static/imgs/woman.jpeg';
import '../static/imgs/man.png';

// 样式文件包
import './style/index.scss';

// 测试 JavaScript 代码转换测试

// import '@babel/polyfill'; // 粗暴地直接引入整个 polyfill 会导致 JavaScript 体积过大

const testEs6 = 123;
const promiseTest = new Promise((resolve) => {
  setTimeout(() => {
    console.log('promise resolve');
    resolve();
  });
});

console.log(data, testEs6, promiseTest);
