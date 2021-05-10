import axios from './../utils/http'

const home = {
    state: {
        chosenInterests: [],
        isLogin: false,
        user: {
            username: '',
            user_id: '',
        },
    },
    mutations: {
        SET_INTEREST(state, data) {
            state.interests = data
        },
        SET_IS_LOGIN(state, data) {
            state.isLogin = data
        },
        SET_USER(state, data) {
            state.user = data
        },
    },
    actions: {
        async getCourseListService({ commit }) {
            try {
                const { data } = await axios.get('/home/getCourseList')
                return data
            } catch {
                console.log('error')
            }
        },
        async getCourseIds({ commit }) {
            try {
                const { data } = await axios.get('/home/getCourseIds')
                return data
            } catch (err) {
                console.log(err)
            }
        },
        async signUp({ commit }, payload) {
            try {
                const { data } = await axios.post('/api/user/signUp', payload)
                return data
            } catch {
                console.log('err')
            }
        },
        async signIn({ commit }, payload) {
            try {
                const { data } = await axios.post('/api/user/signIn', payload)
                return data
            } catch {
                console.log(err)
            }
        },
    },
}

export default home
