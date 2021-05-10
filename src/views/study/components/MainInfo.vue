<template lang="pug">
    div(class="main-info-container")
        div(class="progress")
                div(class="control")
                    el-progress(:percentage="percentage" status="success")
                    el-button(type="danger") 继续学习
                div(class="info")
                    span 目前完成{{info.learned}}个课时，加油啊！
                    span 下一个课时：{{nextCourse}}
        div(class="main")
            div(class="category")
                div(class="title")
                    span 目录
                div(class="chapter" v-for="(chapter, chapterIndex) in catalog" :key="chapterIndex")
                    div(class="chapter-title" )
                        span 章节
                        span(class="index") {{chapterIndex + 1}}
                        //- span HTML介绍
                    div(class="item" v-for="(course, courseIndex) in chapter")
                        span 课时{{course.courseNum}}
                        span {{course.courseTitle}}
                        span(v-show="course.courseType==='live'" class="live-type") 【直播】
                        i(class="el-icon-video-play icon" v-show="course.courseType==='video'")
                        i(class="el-icon-document icon" v-show="course.courseType==='test'")
                        i(class="el-icon-video-camera icon" v-show="course.courseType==='live'")
                        span(class="time" v-show="course.courseType==='video'") {{course.courseLength | courseLengthFilter}}
                        span(class="time" v-show="course.courseType==='live'") {{course.liveDate | liveDateFilter}}
                        el-button(type="danger" size="mini" @click="learnHandle(course.lessonId)") 开始学习
            div(class="rate-container")
                div(class="title")
                    span 评价
                div(class="rate-form")
                    span 给该课程打分
                    el-rate(v-model="commentForm.rate" @change="changeRate")
                    el-input(type="textareat" placeholder="课程评价" v-model="commentForm.comment")
                    div(class="btn-group" v-show="showRelease")
                        el-button(type="info" size="mini" @click="cancelRelease") 取消
                        el-button(type="danger" size="mini" @click="releaseCommentHandle") 发布
                div(class="comment" v-for="item in comment")
                    div(class="item")
                        div(class="header")
                            img(:src="item.avatar")
                            div(class="user-info")
                                span {{item.username}}
                                span 学习{{item.learned}}个课时评价
                            el-rate(v-model="item.rate" disabled)
                        div(class="content") {{item.comment}}
                        div(class="time")
                            span {{item.time | rateDateFilter}}

</template>

<script>
import { flat } from '@/utils/methods'
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
    props: {
        infoData: Object,
    },
    data() {
        return {
            commentForm: {
                rate: 0,
                comment: '',
            },
            percentage: 0,
            info: {},
            comment: [],
            catalog: [],
            showRelease: false,
        }
    },
    computed: {
        nextCourse: function() {
            //数组扁平化后根据已学课程计算下一个课程
            if (this.catalog.length > 0) {
                const flatCatalog = flat(this.catalog)
                return flatCatalog[this.info.learned].courseTitle
            } else {
                return null
            }
        },
    },
    filters: {
        courseLengthFilter: function(value) {
            //截取前5个字符，mm:ss
            return value.slice(0, 5)
        },
        rateDateFilter: function(value) {
            if (value) {
                return value.split('T')[0]
            }
        },
        liveDateFilter: function(date) {
            return moment(date).format('YYYY-MM-DD HH:mm')
        },
    },
    watch: {
        infoData(newVal, oldVal) {
            this.info = newVal.info
            this.comment = newVal.comment
            this.catalog = newVal.res_catalog
            this.percentage =
                (newVal.info.learned / newVal.info.courseLength) * 100
        },
    },
    methods: {
        ...mapActions(['releaseComment']),
        learnHandle(lessonId) {
            const courseId = this.$route.query.courseId
            this.$router.push({
                path: '/course/learn',
                query: { courseId, lessonId },
            })
        },
        changeRate() {
            this.showRelease = true
        },
        cancelRelease() {
            this.showRelease = false
        },
        async releaseCommentHandle() {
            const sessionStorage = window.sessionStorage
            const userId = Number(sessionStorage.getItem('userId'))
            const courseId = Number(this.$route.query.courseId)
            const time = moment().format('YYYY-MM-DD HH:mm:ss')
            const commentData = {
                userId,
                courseId,
                ...this.commentForm,
                time,
            }
            const res = await this.releaseComment(commentData)
            if (res.success === true) {
                console.log(1)
                this.$message({
                    type: 'success',
                    message: '评论发布成功',
                })
            }
            this.$router.go(0)
        },
    },
}
</script>

<style lang="scss" scoped>
.progress {
    width: 1200px;
    margin: 20px auto;
    background-color: #f8f8f8;
    padding: 14px 16px;
    box-sizing: border-box;
    .control {
        overflow: hidden;
    }
    .el-progress {
        margin-top: 8px;
        width: 1000px;
        display: inline-block;
    }
    .el-button {
        float: right;
    }
    .info {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        span {
            color: #999;
            font-size: 13px;
        }
    }
}
.main {
    width: 1200px;
    margin: 20px auto;
}
.category {
    display: inline-block;
    width: 880px;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    .title {
        border-bottom: 1px solid #eaeaea;
    }
    .title span {
        display: inline-block;
        font-size: 18px;
        line-height: 18px;
        padding-bottom: 15px;
    }
    .chapter {
        .chapter-title {
            padding: 12px 0;
            color: #999;
            font-size: 16px;
            font-weight: bolder;
        }
        .index {
            margin: 0 8px;
            display: inline-block;
            width: 24px;
            height: 24px;
            text-align: center;
            border: 2px solid #999;
            border-radius: 50%;
        }
        .item {
            cursor: pointer;
            padding: 12px 0;
            font-size: 14px;
            span:first-child {
                display: inline-block;
                color: #b4b7be;
                width: 60px;
                border-right: 1px solid #b4b7be;
            }
            span:nth-child(2) {
                display: inline-block;
                margin-left: 14px;
            }
            span.live-type {
                margin-left: 12px;
                color: lightcoral;
            }
            .icon {
                float: right;
                font-size: 16px;
                margin-right: 12px;
            }
            .time {
                float: right;
                margin: 0 10px;
            }
            .el-button {
                float: right;
                margin-right: 12px;
                position: relative;
                top: -4px;
                display: none;
            }
        }
        .item:hover {
            background-color: rgba(240, 128, 128, 0.3);
        }
        .item:hover .el-button {
            display: inline-block;
        }
        .item:hover .icon {
            display: none;
        }
        .item:hover .time {
            display: none;
        }
    }
}
.rate-container {
    padding: 20px;
    box-sizing: border-box;
    vertical-align: top;
    display: inline-block;
    width: 300px;
    background-color: #fff;
    margin-left: 20px;
    color: #666;
    font-size: 12px;
    .title {
        border-bottom: 1px solid #eaeaea;
    }
    .title span {
        display: inline-block;
        font-size: 18px;
        line-height: 18px;
        padding-bottom: 15px;
    }
    .rate-form {
        padding: 16px 0;
        overflow: hidden;
        span {
            margin-right: 10px;
        }
        .el-rate {
            display: inline-block;
            vertical-align: bottom;
        }
        .el-input {
            margin-top: 12px;
        }
        .btn-group {
            margin-top: 12px;
            float: right;
        }
    }
    .comment .item {
        margin-top: 20px;
        vertical-align: top;
        .header {
            img {
                width: 30px;
                height: 30px;
                display: inline-block;
            }
            .user-info {
                vertical-align: top;
                display: inline-block;
                width: 100px;
                margin: 0 4px;
                span {
                    display: block;
                }
            }
            .el-rate {
                vertical-align: top;
                display: inline-block;
            }
        }
        .content {
            margin-top: 10px;
            color: #333;
            font-size: 14px;
        }
        .time {
            margin-top: 6px;
        }
    }
}
</style>
