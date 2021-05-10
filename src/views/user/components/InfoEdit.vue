<template lang="pug">
    div(class="info-edit-wrapper")
        el-form(ref="form" :model="form" label-width="80" class="form")
            el-form-item(label="昵称" class="username")
                el-input(v-model="form.username" size="mini")
            el-form-item(label="头像" class="avatar")
                img(:src="form.avatar" ref="avatarImg")
                div(class="imgMask" )
                    span 更换图片
                    input(type="file" @change="changeAvatar" accept="image/*")
            el-form-item(label="性别" )
                el-radio-group(v-model="form.sex")
                    el-radio(label="男")
                    el-radio(label="女")
            el-form-item(label="个人介绍" class="user-intro")
                el-input(type="textarea" v-model="form.userIntro" placeholder="用一段话介绍自己，会在你的个人页面显示，最多输入80字" size="mini")
            el-form-item(label="常用邮箱" class="email edit-item" v-show="!editEmail")
                span {{form.email}}
                span(@click="toggleEditEmail") 修改邮箱
            el-form-item(label="常用邮箱" class="email edit-item" v-show="editEmail")
                el-input(v-model="form.email" size="mini")
                span(@click="toggleEditEmail") 取消
            el-form-item(label="手机号码" class="phone edit-item" v-show="!editPhone")
                span {{form.phone}}
                span(@click="toggleEditPhone") 修改手机号
            el-form-item(label="手机号码" class="phone edit-item" v-show="editPhone")
                el-input(v-model="form.phone" size="mini")
                span(@click="toggleEditPhone") 取消
            el-form-item(label="QQ号码")
                el-input(v-model="form.qqNumber" size="mini")
            el-form-item
                el-button( @click="onSubmit") 保存
</template>

<script>
import jwt from 'jwt-decode'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            form: {
                username: '',
                sex: '',
                userIntro: '',
                qqNumber: '',
                email: '',
                phone: '',
                avatar: '',
            },
            updateAvatarData: {},
            editEmail: false,
            editPhone: false,
        }
    },
    async created() {
        const token = window.localStorage.getItem('token')
        const decode = jwt(token)
        if (Date.now() < decode.exp * 1000) {
            //token有效
            const userId = decode.id
            const userInfo = await this.getUserInfo(userId)
            Object.assign(this.form, userInfo)
        }
    },
    methods: {
        ...mapActions(['getUserInfo', 'updateUserInfo']),
        async onSubmit() {
            const res = await this.updateUserInfo({
                formData: this.form,
                avatarData: this.updateAvatarData,
            })
            if (res.success === true) {
                this.$message({
                    type: 'success',
                    message: '修改成功',
                })
                this.$router.go(0)
            }
        },
        toggleEditEmail() {
            this.editEmail = !this.editEmail
        },
        toggleEditPhone() {
            this.editPhone = !this.editPhone
        },
        changeAvatar(e) {
            //更换图片
            if (e.target.files.length !== 0) {
                this.$refs.avatarImg.src = URL.createObjectURL(
                    e.target.files[0]
                )
                // this.form.avatar = e.target.files[0]
                this.updateAvatarData = new FormData()
                this.updateAvatarData.set('avatar', e.target.files[0])
            } else {
                console.log(e.target.files)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.form {
    padding: 20px 40px;
    .el-input {
        width: 200px;
    }
    .avatar {
        position: relative;
    }
    .avatar img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
    .avatar .imgMask {
        opacity: 0;
        transition: opacity 0.5s;
        cursor: pointer;
        position: absolute;
        left: 40px;
        top: 0;
        width: 100px;
        height: 100px;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            color: #fff;
        }
    }
    .avatar .imgMask:hover {
        opacity: 1;
        transition: opacity 0.5s;
    }
    .avatar input {
        opacity: 0;
        position: absolute;
        left: 40px;
        top: 0;
        width: 100px;
        height: 100px;
    }
    .edit-item {
        font-size: 13px;
        color: #444;
        span:last-child {
            margin-left: 10px;
            color: $main-color;
            cursor: pointer;
        }
    }
    .user-intro .el-textarea {
        width: 500px;
    }
    .el-button {
        background-color: $main-color;
        color: #fff;
    }
}
</style>
