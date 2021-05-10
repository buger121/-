<template lang="pug">
    div(class="sign-up-dialog")
        div(class="overlay-163")
        div(class="dialog")
            i(class="el-icon-close" @click="closeDialog")
            div(class="title") 报名确认
            div(class="main")
                img(:src="courseData.banner_tiny")
                div(class="info")
                    div(class="course-name") {{courseData.name}}
                    div(class="price") 价格：
                        span {{courseData.price}}
            div(class="footer")
                div(class="cancel-btn btn" @click="closeDialog") 取消
                div(class="sign-up-btn btn" @click="signUpHandle") 报名
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    props: {
        courseData: Object,
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        }),
    },
    methods: {
        ...mapActions(['signUpCourse']),
        closeDialog() {
            this.$emit('close-dialog')
        },
        async signUpHandle() {
            this.$emit('close-dialog')
            const courseId = this.$route.params.course_id
            const res = await this.signUpCourse(courseId)
            if (res.success) {
                this.$message({
                    message: '您已经成功报名',
                    type: 'success',
                })
                this.$router.go(0)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.sign-up-dialog {
    .dialog {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 620px;
        height: 340px;
        background-color: #fff;
        z-index: 999;
        padding: 10px 30px;
    }
    .el-icon-close {
        position: absolute;
        right: 15px;
        top: 15px;
        cursor: pointer;
    }
    .title {
        border-left: 4px solid #fb4a3e;
        margin-top: 24px;
        padding-left: 10px;
        font-size: 24px;
        line-height: 26px;
        margin-bottom: 22px;
        font-weight: 500;
    }
    .main {
        img {
            width: 160px;
            height: 100px;
            object-fit: cover;
        }
        .info {
            margin-left: 20px;
            display: inline-block;
            vertical-align: top;
            font-size: 22px;

            .course-name {
                line-height: 36px;
                color: #2d2d2d;
            }
            .price {
                color: #aaa;
                span {
                    color: #ff4c38;
                }
            }
        }
    }
    .footer {
        margin-top: 70px;
        display: flex;
        justify-content: center;
        .btn {
            display: inline-block;
            width: 160px;
            margin: 0 36px;
            line-height: 58px;
            font-size: 18px;
            cursor: pointer;
            color: #fff;
            text-align: center;
            border-radius: 2px;
        }
        .cancel-btn.btn {
            background-color: #676767;
        }
        .sign-up-btn.btn {
            background-color: #fb4a3e;
        }
    }
}
</style>
