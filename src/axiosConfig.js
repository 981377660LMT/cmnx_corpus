import axios from 'axios'


if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api';
}
else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://cmnx.me:8888/api';
}

axios.defaults.timeout = 5000;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
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
    // 对响应错误做点什么
    return error.response;
});