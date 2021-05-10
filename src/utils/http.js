/**
 * axios封装
 * 请求拦截，响应拦截，错误统一处理
 */
import axios from 'axios'
import router from '@/router'

/**
 * 跳转登录页
 * 携带当前路由，实现在登录页面完成后返回当前页
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath,
        },
    })
}

const errorHandle = (status, other) => {
    //状态码判断
    switch (status) {
        //401:未登录状态，跳转登录页
        case 401:
            toLogin()
            break
        //403:token过期，清楚token并跳转登录页
        case 403:
            //TODO
            toLogin()
            break
        //404:请求资源不存在
        case 404:
            //TODO
            break
        default:
            console.log(other)
    }
}

//创建axios实例
var instance = axios.create({
    timeout: 1000 * 12,
    baseURL: 'http://localhost:3031',
})
//设置post请求头
// instance.defaults.headers.post['Content-type'] = 'application/json'

//请求拦截器,请求头添加token
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = token
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

//响应拦截器
instance.interceptors.response.use(
    //请求成功
    res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
    // 请求失败
    error => {
        const { response } = error
        if (response) {
            //请求已发出，但不在2xx范围内
            errorHandle(response.status, response.data.message)
            return Promise.reject(response)
        } else {
            //处理断网
            //TODO
        }
    }
)

export default instance
