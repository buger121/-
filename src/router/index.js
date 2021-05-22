import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/HomePage.vue'
import PersonInfo from '../views/user/PersonInfo.vue'
import MyOrder from '../views/user/MyOrder.vue'
import MyCourse from '../views/user/MyCourse.vue'
import MyMessage from '../views/user/MyMessage.vue'
import CourseDetail from '../views/course/CourseDetail.vue'
import CourseMain from '../views/study/CourseMain.vue'
import CourseLearn from '../views/learn/CourseLearn.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/personInfo',
        name: 'personInfo',
        component: PersonInfo,
    },
    {
        path: '/myOrder',
        name: 'myOrder',
        component: MyOrder,
    },
    {
        path: '/myCourse',
        name: 'myCourse',
        component: MyCourse,
    },
    {
        path: '/myMessage',
        name: 'MyMessage',
        component: MyMessage,
    },
    {
        path: '/course/detail/:course_id',
        name: 'CourseDetail',
        component: CourseDetail,
    },
    {
        path: '/course/main',
        name: 'CourseMain',
        component: CourseMain,
    },
    {
        path: '/course/learn',
        name: 'CourseLearn',
        component: CourseLearn,
    },
]

const router = new VueRouter({
    // mode: 'history',
    scrollBehavior: () => {
        return { x: 0, y: 0 }
    },
    routes,
})

router.beforeEach((to, from, next) => {
    next()
})

export default router
