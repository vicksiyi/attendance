export default {
    namespaced: true,
    state: {
        token: '',
        account: ""
    },
    mutations: {
        setToken(state, val) {
            state.token = val;
        },
        updateAccount(state, val) {
            state.account = val;
        }
    },
    actions: {
        setTokenAsync({ commit }, val) {
            commit('setToken', val)
        }
    },
    getters: {
        getHeader: function (state) {
            return { Authorization: state.token }
        }
    }
}