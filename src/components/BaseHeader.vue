<template lang="pug">
    div.header-container
        div(:class="{'overlay-163': showOverlay}")
        div.header
            div(class="title" @click="toHomePage")
                span 云课堂
                span 你的系统化学习平台
            div.search 
                el-input(v-model="input", placeholder="请输入内容" )
                    el-select(v-model="select" slot="prepend" placeholder="请选择")
                        el-option(label="课程名" value="courseName")
                        el-option(label="网校名" value="schoolName")
                    el-button(slot="append" icon="el-icon-search")
            div.tools
                span.icons
                    i(class="el-icon-download")
                    i(class="el-icon-sell")
                    i(class="el-icon-shopping-cart-2")
                    i(class="el-icon-bell")
                span.user-center
                    span |
                    span 会员中心
                    span 我的学习
                    span |
                    span(@click="loginHandle" v-show="!isLogin") 登录/注册
                    span(v-if="isLogin" class="username") {{user.username}}
                span.pop-over
                    el-popover(placement="top" trigger="hover" popper-class="popover-wrapper-163")
                        div
                            div.item(@click="toPersonalInfo") 个人资料
                            div.item(@click="toMyOrder") 我的订单
                            div.item 帮助与反馈
                            div.item 设置
                            div.item(@click="signOut") 退出
                        img(class="avatar" :src="avatarSrc" slot="reference" v-if="isLogin" ref="avatar")
                        img(class="avatar" src="https://study-163.oss-cn-beijing.aliyuncs.com/user/default/avatar2.jpg" slot="reference" v-if="!isLogin")
        BaseLoginDialog(:showDialog="showLoginDialog" @close-dialog="closeHandle")

</template>

<script>
import { mapActions } from 'vuex'
import jwt_decode from 'jwt-decode'
export default {
    computed: {
        //动态绑定img的src属性
        avatarSrc: function() {
            return this.user.avatar
        },
    },
    async created() {
        //token处理
        const tokenExpire = window.localStorage.getItem('token-expire')
        if (tokenExpire > Date.now()) {
            //token未过期
            this.isLogin = true
        } else {
            this.isLogin = false
        }
        try {
            const token = window.localStorage.getItem('token')
            const decode = jwt_decode(token)
            this.user = decode
            const res = await this.getUserInfo(decode.id)
            this.user = res
        } catch (err) {
            console.log(err)
        }
    },
    data: function() {
        return {
            input: '',
            select: '',
            showLoginDialog: false,
            showOverlay: false,
            user: {},
            isLogin: false,
        }
    },
    methods: {
        ...mapActions(['getUserInfo']),

        loginHandle() {
            this.showLoginDialog = true
            this.showOverlay = true
        },
        closeHandle() {
            this.showLoginDialog = false
            this.showOverlay = false
        },
        toHomePage() {
            this.$router.push({ path: '/' })
        },
        toPersonalInfo() {
            try {
                this.$router.push({
                    path: '/personInfo',
                    params: { userId: 21 },
                })
            } catch (err) {
                //避免重复路由
                console.log(err)
            }
        },
        toMyOrder() {
            try {
                this.$router.push({
                    path: '/myOrder',
                })
            } catch (err) {
                //避免重复路由
                console.log(err)
            }
        },
        signOut() {
            this.isLogin = false
        },
    },
}
</script>

<style lang="scss" scoped>
.header-container {
    width: 100%;
    min-width: 1300px;
    margin-bottom: 20px;
    background-color: #fff;
    background-attachment: scroll;
    .header {
        width: 80%;
        padding: 4px 0;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: flex-start;
        cursor: pointer;

        span:last-child {
            font-size: 12px;
            letter-spacing: 3px;
        }
    }
    .search {
        width: 320px;
    }
    .tools {
        white-space: nowrap;
        & > span {
            display: inline-block;
            vertical-align: middle;
        }
        .icons i {
            margin-right: 30px;
            color: #aaa;
            cursor: pointer;
        }
        .user-center span {
            font-size: 13px;
            font-weight: 400;
            margin-right: 20px;
            cursor: pointer;
        }
        .user-center .username:hover {
            color: $main-color;
        }
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    ::v-deep .el-input-group__prepend {
        background-color: #fff;
    }
    ::v-deep .el-input__inner {
        height: 33px;
    }
}
</style>
