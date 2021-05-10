import axios from './../utils/http'

const user = {
    state: {
        userInfo: {},
    },
    mutations: {
        SET_USER_INFO(state, data) {
            state.userInfo = data
        },
    },
    actions: {
        async getUserInfo({ commit }, user_id) {
            try {
                const { data } = await axios.get(
                    `api/user/getUserInfo/${user_id}`
                )
                return data
            } catch (err) {
                //token失效，打开登陆窗口
                console.log(err)
            }
        },

        async getOrders({ commit }) {
            try {
                const { data } = await axios.get('api/user/orders')
                return data
            } catch (err) {
                console.log(err)
            }
        },

        /**
         *
         *
         * @param {object} dispatch对象
         * @param {object} 包含两个对象，一个是表单数据formData，一个是包含avatar文件的formData对象avatarData
         * @return {object} 数据更新结果
         */
        async updateUserInfo({ commit }, userInfo) {
            const bodyFormData = new FormData()
            for (let key of Object.keys(userInfo.formData)) {
                bodyFormData.append(key, userInfo.formData[key])
            }
            try {
                bodyFormData.set('avatar', userInfo.avatarData.get('avatar'))
            } catch (err) {
                //当传入的avatar表单数据为空
                //TODO
            }

            try {
                const { data } = await axios.post(
                    'api/user/updateUserInfo',
                    bodyFormData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                )
                return data
            } catch {
                console.log('err')
            }
        },
    },
}

export default user
