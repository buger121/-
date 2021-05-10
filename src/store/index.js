import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import course from './course'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        namespaced: true,
        home,
        course,
        user,
    },
})

export default store
