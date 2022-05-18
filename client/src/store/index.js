import Vue from 'vue';
import Vuex from 'vuex';
import header from './header';
import createPersistedState from "vuex-persistedstate"

// 引入持久化
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        header
    },
    // 持久化操作
    plugins: [createPersistedState({
        storage: window.localStorage
    })]
})