<template lang="pug">
    div(class="login-container" v-show="showDialog")
        i(class="el-icon-close" @click="closeDialog")
        div(v-show="!toggleSignUp")
            tabs
                tab(title="手机号登录") 
                    div(class="login__phone")
                        div(class="message")
                            i(class="el-icon-message")
                            span 使用短信验证登录
                        el-input(placeholder="请输入手机号" prefix-icon="el-icon-mobile-phone" v-model="phone")
                        el-input(placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="password" show-password)
                        div(class="login__btn" @click="signInHandle") 登录
                        span(class="register-btn" @click="toggleHandle") 去注册>
                tab(title="邮箱登录")
                    div(class="login__email")
                        el-input(placeholder="请输入邮箱" prefix-icon="el-icon-mobile-phone" v-model="email")
                        el-input(placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="password" show-password)
                        div(class="login__btn" @click="signInHandle") 登录
            div(class="login-set")
                el-checkbox(v-model="checkLogin")
                span 十天内免登录
                span(class="seprator-163")
                span 忘记密码
        div(v-show="toggleSignUp" class="sign-up")
            div(class="sign-up-head")
                span 手机号注册
            el-input(placeholder="请输入手机号" prefix-icon="el-icon-mobile-phone" v-model="phone")
            el-input(placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="password" show-password)
            el-input(placeholder="确认密码" prefix-icon="el-icon-lock" v-model="confirmPassword" show-password)
            div(class="login__btn" @click="signUpHandle") 注册
            span(class="register-btn" @click="toggleHandle") 去登录>

</template>

<script>
import Tab from './common/tab.vue'
import Tabs from './common/tabs.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
    components: { Tab, Tabs },
    props: {
        showDialog: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            phone: '',
            password: '',
            confirmPassword: '',
            checkLogin: '',
            email: '',
            toggleSignUp: false, //切换注册表单和登录表单
        }
    },
    methods: {
        ...mapActions(['signUp', 'signIn']),
        ...mapMutations(['SET_USER_INFO']),
        toggleHandle() {
            this.phone = ''
            this.password = ''
            this.confirmPassword = ''
            this.toggleSignUp = !this.toggleSignUp
        },
        async signUpHandle() {
            const params = {
                phone: Number(this.phone),
                password: this.password,
                confirmPassword: this.confirmPassword,
            }
            const res = await this.signUp(params)
            if (!res.success) {
                this.$message({
                    message: res.message,
                    type: 'error',
                })
            } else {
                this.$message({
                    message: '注册成功',
                    type: 'success',
                })
                this.toggleHandle()
            }
        },
        async signInHandle() {
            const params = {
                phone: Number(this.phone),
                password: this.password,
            }
            const res = await this.signIn(params)
            if (!res.success) {
                this.$message({
                    message: res.message,
                    type: 'error',
                })
            } else {
                this.loginHandle(res)
                this.$message({
                    message: '登录成功',
                    type: 'success',
                })
                this.$router.go(0)
            }
        },
        loginHandle(userData) {
            //登录成功
            this.$emit('close-dialog')
            const user = {
                username: userData.username,
                user_id: userData.uid,
            }
            this.SET_USER_INFO(user)
            localStorage.setItem('token', userData.token)
            //设置token到期时间
            localStorage.setItem('token-expire', Date.now() + 60 * 60 * 1000)
            //使用sessionStorage存储userId
            const myStorage = window.sessionStorage
            myStorage.setItem('userId', user.user_id)
        },
        closeDialog() {
            this.$emit('close-dialog')
        },
    },
}
</script>

<style lang="scss" scoped>
.login-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    z-index: 999;
    background: #fff;
    padding: 25px 40px;
    border-radius: 4px;
    .el-icon-close {
        position: absolute;
        right: 15px;
        top: 15px;
        cursor: pointer;
    }
    .message {
        margin: 6px 0;
        text-align: right;
        line-height: 16px;
        height: 16px;
        cursor: pointer;
        font-size: 12px;
        color: #666;
    }
    .el-input {
        margin-bottom: 20px;
    }
    ::v-deep .el-input__inner {
        height: 40px;
    }
    .login__btn {
        margin-top: 20px;
        margin-bottom: 15px;
        width: 100%;
        border-radius: 2px;
        cursor: pointer;
        line-height: 44px;
        font-size: 18px;
        color: #fff;
        background-color: $main-color;
        text-align: center;
    }
    .login__phone {
        position: relative;
    }
    .register-btn {
        position: absolute;
        right: 10px;
        bottom: -20px;
        font-size: 14px;
        color: $main-color;
        cursor: pointer;
    }
    .login__email {
        margin-top: 28px;
    }
    .login-set {
        font-size: 12px;
        color: #999;
        line-height: 17px;

        span:nth-of-type(1) {
            margin-left: 8px;
        }
    }
    .sign-up {
        position: relative;
        margin: 20px 15px;

        .sign-up-head {
            font-size: 18px;
            position: relative;
            bottom: 25px;
        }
    }
}
</style>
