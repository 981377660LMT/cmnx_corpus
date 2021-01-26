import axios from 'axios'
import router from './router'
import { Message } from 'element-ui'
import store from './store'

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://127.0.0.1:80/api';
}
else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://139.59.246.237:80/api';
}

axios.defaults.timeout = 5000;

// axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['Authorization'] = sessionStorage.getItem('token');
    // console.log(config);
    // 在发送请求之前做些什么
    //发送之前要将token带入header
    return config;
}, function (error) {
    // console.log(error);
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log(response);
    // 对响应数据做点什么
    return response;
}, function (error) {
    console.log(error.response);
    let { status } = error.response;
    // 约定好403状态码为token不正确
    if (status == 403) {
        router.push('/home')
        Message.error('(◎-◎;)!!   请先进行登录!')
        window.sessionStorage.removeItem('token');
        store.commit('setToken', '');
        return
    }
    // 对除了token错误的响应错误做点什么
    return error.response;
});