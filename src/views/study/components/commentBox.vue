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
                    div(class="box-main") {{comment.content}}
            div(class="my-comment")
                el-input(type="textarea" :rows="2" v-model="myReply" placeholder="请添加你的评论...")
                el-button(type="danger" size="mini") 评论
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        discussId: Number,
    },
    data() {
        return {
            myReply: '',
            commentsData: [],
        }
    },
    async mounted() {
        const res = await this.getDiscussById(this.discussId)
        this.commentsData = res
    },
    methods: {
        ...mapActions(['getDiscussById']),
    },
    filters: {
        DateFilter: function(val) {
            return val.split('T')[0]
        },
    },
}
</script>

<style lang="scss" scoped>
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
