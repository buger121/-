<template lang="pug">
    div(class="discuss-item-container")
        div(class="item-header")
            img(:src="item.userAvatar")
            span(class="username") {{item.userName}}
            span(class="time") {{item.releaseDate | DateFormate}}
            span(class="origin") 【{{item.discussArea === 1 ? '老师答疑区' : '综合讨论区'}}】
        div(class="item-content") 
            span {{item.content}}
            span(class="del-btn" @click="deleteDialogVisible = true" v-if="userId===item.userId") 删除
        div(class="item-footer")
            span(class="view")
                i(class="el-icon-view")
                span ({{item.view}})
            span(class="comment" @click="toggleShowComment")
                i(class="el-icon-chat-dot-round")
                span ({{item.reply.length}})
            span(class="like" :class="{liked: isLiked(item.like)}" @click="updateDiscuss({attr:'like', discussId:item.discussId})")
                i(class="el-icon-s-opportunity")
                span ({{item.like.length}})
            CommentBox(:discussId="item.discussId" v-show="showComment" @update-discuss-date="updateDiscussData" :userId="userId")
            el-dialog(title="提示" :visible.sync="deleteDialogVisible" width="30%")
                span 确认删除这条讨论?
                span(slot="footer" class="dialog-footer")
                    el-button(@click="deleteDialogVisible=false") 取消
                    el-button(type="primary" @click="handleDelete(item.discussId)") 确定
</template>

<script>
import jwt from 'jwt-decode'
import { mapActions } from 'vuex'
import CommentBox from './commentBox.vue'
export default {
    components: { CommentBox },
    props: {
        item: Object,
    },
    data() {
        return {
            showComment: false,
            deleteDialogVisible: false,
        }
    },
    computed: {
        userId: function() {
            const token = window.localStorage.getItem('token')
            const decode = jwt(token)
            return decode.id
        },
    },
    methods: {
        ...mapActions(['updateCourseDiscuss', 'deleteDiscussById']),
        toggleShowComment() {
            this.showComment = !this.showComment
        },
        updateDiscussData() {
            this.$emit('update-discuss-data')
        },
        async handleDelete(discussId) {
            this.deleteDialogVisible = false

            const res = await this.deleteDiscussById(discussId)
            if (res.success) {
                this.$message({
                    type: 'success',
                    message: '删除成功',
                })
                this.updateDiscussData()
            }
        },
        async updateDiscuss(params) {
            const courseId = this.$route.query.courseId
            params.courseId = courseId
            const res = await this.updateCourseDiscuss(params)
            if (res.success === true) {
                this.updateDiscussData()
            }
        },
        isLiked(likes) {
            if (likes.indexOf(String(this.userId)) !== -1) {
                return true
            } else {
                return false
            }
        },
    },
    filters: {
        DateFormate(val) {
            return val.split('T')[0]
        },
    },
}
</script>

<style lang="scss" scoped>
.item:hover {
    .del-btn {
        display: inline-block !important;
    }
}
.discuss-item-container {
    padding: 16px 0;
    font-size: 12px;
    color: #666;
    .item-header {
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 18px;
        }
        span {
            display: inline-block;
            vertical-align: top;
            position: relative;
            top: 12px;
        }
        .username {
            color: $main-color;
            margin-right: 28px;
        }
        .origin {
            float: right;
        }
    }
    .item-content {
        font-size: 14px;
        color: #666;
        margin: 16px 0;
        .del-btn {
            line-height: 20px;
            padding: 0 6px;
            border-radius: 4px;
            cursor: pointer;
            border: 1px solid #999;
            float: right;
            position: relative;
            top: -4px;
            display: none;
        }
    }
    .item-footer {
        overflow: hidden;
        & > span {
            cursor: pointer;
            float: right;
            margin-left: 12px;
            i {
                margin-right: 4px;
            }
        }
        & > span:hover {
            color: #333;
        }
        span.liked {
            color: $main-color;
        }
    }
}
</style>
