import * as singleSpa from 'single-spa'; //导入single-spa
import axios from 'axios';

/*
* runScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务
* */
const runScript = url => new Promise((resolve, reject) => {
    console.log(url)
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
})

const getSubPath = (url, bundle = 'app') => {
    return axios.get(url)
        .then(res => {
            let { data } = res,
                { entrypoints, publicPath } = data,
                assets = entrypoints[bundle].assets;
            return assets.map(asset => publicPath + asset);
        })
        .catch(err => Promise.reject(err));
}

const loadAllScript = paths => Promise.all(paths.map(runScript))


singleSpa.registerApplication( //注册微前端服务
    'app1',
    async () => {
        // 注册用函数，
        // return 一个singleSpa 模块对象，模块对象来自于要加载的js导出
        // 如果这个函数不需要在线引入，只需要本地引入一块加载：
        // () => import('xxx/main.js')
        let paths = await getSubPath('http://127.0.0.1:3000/manifest.json', 'app');
        console.log(paths);
        await loadAllScript(paths);
        return window.singleVue;
    },
    location => location.pathname.startsWith('/app1') // 配置微前端模块前缀
);

singleSpa.start(); // 启动
