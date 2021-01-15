import Vue from 'vue'
import Vuex from 'vuex'
import loadingTips from './loadingTips.json'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loadingTips,
    },
    mutations: {
        changeState(state, args) {
            return
        }
    },
    actions: {
        asyncTrigMutation(context, args) {
            context.commit('changeState', args)
        }
    },
    getters: {
        getLoadingTips(state) {
            return Object.values(state.loadingTips)
        }
    }
})

