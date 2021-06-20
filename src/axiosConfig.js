import axios from 'axios'
import router from './router'
import { Message } from 'element-ui'
import store from './store'

axios.defaults.baseURL = 'https://cmnx.me/api'

axios.defaults.timeout = 5000

// axios.defaults.withCredentials = true

axios.interceptors.request.use(
  function(config) {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['Authorization'] = sessionStorage.getItem('token')

    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    try {
      const { status } = error.response
      // 约定好403状态码为token不正确
      if (status == 403) {
        router.push('/home')
        Message.error('(◎-◎;)!!   请先进行登录!')
        window.sessionStorage.removeItem('token')
        store.commit('setToken', '')
        return
      }
      return error.response
    } catch (ignored) {
      return {
        data: { searchResult: [] },
        status: 401,
      }
    }
  }
)
