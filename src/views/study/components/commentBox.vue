<template lang="pug">
    div(class="comment-box-container")
        div(class="comment-box" )
            div(v-for="comment in commentsData" class="comment-item")
                //- i(class="el-icon-arrow-up")
                img(:src="comment.userAvatar")
                div(class="box-info")
                    div(class="box-header")
                        span {{comment.userName}}
                        span {{comment.releaseDate | DateFilter}}
                    div(class="box-main") 
                        span {{comment.content}}
                        span(class="del-btn" @click="deleteDiscussHandle(comment.discussId)" v-if="userId===comment.userId") 删除
            div(class="my-comment")
                el-input(type="textarea" :rows="2" v-model="myReply" placeholder="请添加你的评论...")
                el-button(type="danger" size="mini" @click="addReplyDiscuss") 评论
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        discussId: Number,
        userId: Number,
    },
    data() {
        return {
            myReply: '',
            commentsData: [],
        }
    },
    mounted() {
        this.updateCommentsData()
    },
    methods: {
        ...mapActions([
            'getDiscussById',
            'releaseCourseDiscuss',
            'deleteDiscussById',
        ]),
        async deleteDiscussHandle(discussId) {
            const res = await this.deleteDiscussById(discussId)
            if (res.success) {
                this.$message({
                    type: 'success',
                    message: '删除成功',
                })
                this.updateCommentsData()
                this.$emit('update-discuss-date')
            }
        },
        async updateCommentsData() {
            const res = await this.getDiscussById(this.discussId)
            this.commentsData = res
        },
        async addReplyDiscuss() {
            const courseId = this.$route.query.courseId
            const params = {
                content: this.myReply,
                replyTo: this.discussId,
                courseId,
            }
            const res = await this.releaseCourseDiscuss(params)
            if (res.success) {
                this.$message({
                    type: 'success',
                    message: '发布评论成功！',
                })
                this.myReply = ''
                this.updateCommentsData()
                this.$emit('update-discuss-date')
            }
        },
    },
    filters: {
        DateFilter: function(val) {
            return val.split('T')[0]
        },
    },
}
</script>

<style lang="scss" scoped>
.comment-item:hover {
    .del-btn {
        display: inline-block !important;
    }
}
.del-btn {
    line-height: 16px;
    padding: 0 6px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #999;
    float: right;
    position: relative;
    display: none;
}
.comment-box {
    position: relative;
    border: 1px solid #eee;
    margin-top: 18px;
    padding: 10px 6px 16px 6px;
    .comment-item {
        margin-top: 10px;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    i {
        font-size: 12px;
        color: #eee;
        position: absolute;
        right: 130px;
        top: -9px;
    }
    .box-info {
        width: 800px;
        display: inline-block;
        vertical-align: top;
        margin-left: 12px;
        font-size: 10px;
        .box-header {
            span:first-child {
                color: $main-color;
                margin-right: 8px;
            }
        }
        .box-main {
            color: #666;
        }
    }
    .my-comment {
        margin-top: 14px;
        .el-button {
            margin-top: 8px;
        }
    }
}
</style>
