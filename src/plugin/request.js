import axios from 'axios'
import NProgress from 'nprogress'
import qs from 'qs'
var instance = axios.create({
    baseURL: 'http://47.92.50.43:8888'
});

// let qs = {
//     stringify(obj) {
//         return Object.keys(obj).map(k => k + '=' + obj[k]).join('&')
//     }
// }

function fmtParams(method, params, data) {
    if (method === 'get') {
        if (!params) return ''
        return decodeURIComponent(qs.stringify(params))
    } else {
        if (!data) return ''
        return decodeURIComponent(qs.stringify(data))
    }
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    NProgress.start()
    let { method, url, params, data } = config
    // 在发送请求之前做些什么
    let str = fmtParams(method, params, data)
    console.log('='.repeat(20));
    console.log(`${method}了${url},参数为${str}`);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    NProgress.done()
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance