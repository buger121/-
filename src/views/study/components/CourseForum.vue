<template lang="pug">
    div(class="forum-container")
        div( v-if="showAll")
            div(class="forum-main")
                div(class="header")
                    div(class="title") 讨论区
                    div(class="desc") 欢迎进入课程讨论区，你可以与本课程的老师和同学在这里交流。如果你有课程相关的问题，请发到老师答疑区；经验、思考、创意、作品、转帖请发到综合讨论区。欢迎分享，鼓励原创，杜绝广告，请大家共同维护一个包容、积极、相互支持的交流氛围，谢谢。
                div(class="item" v-for="item in disscussData")
                    div(class="item-header")
                        img(:src="item.userAvatar")
                        span(class="username") {{item.userName}}
                        span(class="time") {{item.releaseDate | DateFormate}}
                        span(class="origin") 【{{item.discussArea === 1 ? '老师答疑区' : '综合讨论区'}}】
                    div(class="item-content") {{item.content}}
                    div(class="item-footer")
                        span(class="view")
                            i(class="el-icon-view")
                            span ({{item.view}})
                        span(class="comment" @click="toggleShowComment(item.discussId)")
                            i(class="el-icon-chat-dot-round")
                            span ({{item.reply.length}})
                        span(class="like" :class="{liked: isLiked(item.like)}" @click="updateDiscuss({attr:'like', discussId:item.discussId})")
                            i(class="el-icon-s-opportunity")
                            span ({{item.like.length}})
                        CommentBox(:discussId="item.discussId" v-show="commentBoxMap[item.discussId]")
                        
            div(class="forum-aside")
                div(class="discussion-btn")
                    
                div(class="choose-area")
                    div(class="teacher-discuss" @click="showTeacherArea")
                        div(class="intro-img")
                        div(class="intro")
                            div 老师答疑区
                            div 你可以将学习过程中关于课程内容、学习方法发布到本区
                    div(class="base-discuss" @click="showStudentArea")
                        div(class="intro-img base")
                        div(class="intro")
                            div 综合讨论区
                            div 欢迎分享，鼓励原创，无论是你的想法、体验还是还是好书好文章都可分享在这里
        
        DiscussArea(v-else-if="showTeacherDiscuss" areaType="teacher" @back-to-all="backToAll" :discussData="teacherDiscussData" @update-discuss-date="updateDiscussData")
        DiscussArea(v-else-if="showStudentsDiscuss" areaType="student" @back-to-all="backToAll" :discussData="studentDiscussData" @update-discuss-date="updateDiscussData")

</template>

<script>
import jwt from 'jwt-decode'
import { mapActions } from 'vuex'
import DiscussArea from './DiscussArea.vue'
import CommentBox from './commentBox.vue'
export default {
    props: {
        disscussData: Array,
    },
    components: { DiscussArea, CommentBox },
    computed: {
        teacherDiscussData: function() {
            const res = this.disscussData.filter(item => {
                return item.discussArea === 1
            })
            return res
        },
        studentDiscussData: function() {
            const res = this.disscussData.filter(item => {
                return item.discussArea === 2
            })
            return res
        },
        userId: function() {
            const token = window.localStorage.getItem('token')
            const decode = jwt(token)
            return decode.id
        },
    },
    watch: {
        disscussData: {
            handler: function() {
                let tmpMap = {}
                this.disscussData.forEach(item => {
                    tmpMap[item.discussId] = false
                })
                this.commentBoxMap = tmpMap
            },
        },
    },
    data() {
        return {
            showAll: true,
            showTeacherDiscuss: false,
            showStudentsDiscuss: false,
            commentBoxMap: {},
        }
    },
    methods: {
        ...mapActions(['updateCourseDiscuss']),
        showTeacherArea() {
            this.showTeacherDiscuss = true
            this.showAll = false
            this.showStudentsDiscuss = false
        },
        showStudentArea() {
            this.showStudentsDiscuss = true
            this.showAll = false
            this.showTeacherDiscuss = false
        },
        backToAll() {
            this.showAll = true
            this.showTeacherDiscuss = false
            this.showStudentsDiscuss = false
        },
        updateDiscussData() {
            this.$emit('update-discuss-data')
        },
        isLiked(likes) {
            if (likes.indexOf(String(this.userId)) !== -1) {
                return true
            } else {
                return false
            }
        },
        toggleShowComment(disId) {
            const val = this.commentBoxMap[disId]
            this.$set(this.commentBoxMap, disId, !val)
            console.log(this.commentBoxMap[disId])
        },
        async updateDiscuss(params) {
            const courseId = this.$route.query.courseId
            params.userId = this.userId
            params.courseId = courseId
            const res = await this.updateCourseDiscuss(params)
            if (res.success === true) {
                this.updateDiscussData()
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
.forum-container {
    width: 1200px;
    margin: 20px auto;
    .forum-main {
        box-sizing: border-box;
        padding: 14px;
        width: 900px;
        background-color: #fff;
        display: inline-block;
        .header {
            border-bottom: 1px solid #dfdfdf;
            .title {
                font-size: 18px;
                line-height: 20px;
                color: #444;
                margin-bottom: 16px;
            }
            .desc {
                color: #666;
                font-size: 14px;
                padding-bottom: 20px;
            }
        }
        .item {
            padding: 16px 0;
            border-bottom: 1px solid #dfdfdf;
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
    }
    .forum-aside {
        display: inline-block;
        vertical-align: top;
        margin-left: 20px;
        width: 280px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 14px;
        .discussion-btn {
            width: 240px;
            height: 45px;
            background: url('@/assets/img/forum.png');
            background-position: -10px 0;
            cursor: pointer;
        }
        .discussion-btn:hover {
            background-position: -10px -48px;
        }
        .choose-area {
            .teacher-discuss {
                cursor: pointer;
            }
            .base-discuss {
                cursor: pointer;
            }
            .intro-img {
                width: 94px;
                height: 94px;
                background: url('@/assets/img/forum.png');
                background-position: 0 -100px;
                cursor: pointer;
                display: inline-block;
            }
            .intro-img.base {
                background-position: -94px -100px;
            }
            .intro {
                vertical-align: top;
                width: 140px;
                display: inline-block;
                margin-left: 8px;
                div:first-child {
                    font-size: 16px;
                    color: #666;
                    margin: 12px 0 16px 0;
                }
                div:last-child {
                    font-size: 14px;
                    color: #999;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
