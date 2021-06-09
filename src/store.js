import Vue from 'vue'
import Vuex from 'vuex'
import loadingTips from './loadingTips.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingTips,
    showMusic: false,
    //用户收藏词条数
    likeNumber: 0,
    //在手机界面被删除的语料id
    corpusId: '',
    //1是登录，2是注册，3是登陆完之后
    loginState: 1,
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
  },
  mutations: {
    toggleMusic(state) {
      state.showMusic = !state.showMusic
    },
    hiddenMusic(state) {
      state.showMusic = false
    },
    changeLoginState(state, value) {
      state.loginState = value
    },
    setToken(state, value) {
      state.token = value
    },
    changeLikeNumber(state, value) {
      state.likeNumber = value
    },
    changeCorpusId(state, value) {
      state.corpusId = value
    },
  },
  actions: {},
  getters: {
    getLoadingTips(state) {
      return Object.values(state.loadingTips)
    },
  },
})
