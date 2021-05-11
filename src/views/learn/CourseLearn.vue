<template lang="pug">
    div(class="course-learn-container")
        div(class="back-btn" @click="$router.push({path: '/course/main/', query:{courseId: courseParam.courseId}})") < 返回课程主页
        //- div(class="course-info")
        //-     span 章节1
        //-     span 课时1
        //-     span 什么是HTML
        VideoPlayer(:toggleVideo="toggleVideo" :videoSrc="videoSrc" v-show="lessonType === 'video'")
        TestBox(v-if="lessonType === 'test'" :testData="testData")
        LivePlayer(v-if="lessonType === 'live'")
        div(class="aside" v-if="lessonType !== 'live'")
            CourseLearnAside(@toggle-aside="toggleHandle" :courseInfo="courseParam" :courseData="courseData")

</template>

<script>
import VideoPlayer from './components/VideoPlayer.vue'
import TestBox from './components/TestBox.vue'
import LivePlayer from './components/LivePlayer.vue'
import CourseLearnAside from './components/CourseLearnAside.vue'
import { mapActions } from 'vuex'
import { flat } from '@/utils/methods'
export default {
    components: { CourseLearnAside, VideoPlayer, TestBox, LivePlayer },
    data() {
        return {
            toggleVideo: false,
            courseParam: {
                courseId: this.$route.query.courseId,
            }, //courseId, lessonId
            courseData: {
                res_catalog: [],
            }, //catalog,info,comments
            testData: [],
        }
    },
    async created() {
        const query = this.$route.query
        this.courseParam = query
        //获取课程数据
        this.courseData = await this.getCourseMainInfo(
            this.courseParam.courseId
        )
        if (this.lessonType === 'test') {
            //当课程类型为test，获取测试题数据
            this.testData = await this.getTestData(this.courseParam.lessonId)
        }
    },
    computed: {
        videoSrc: function() {
            const catalog = flat(this.courseData.res_catalog)
            //根据lessonId查找videoSrc
            for (let obj of catalog) {
                if (obj.lessonId == this.courseParam.lessonId) {
                    return obj.videoSrc
                }
            }
        },
        lessonType: function() {
            const catalog = flat(this.courseData.res_catalog)
            for (let obj of catalog) {
                if (obj.lessonId == this.courseParam.lessonId) {
                    return obj.courseType
                }
            }
        },
    },
    methods: {
        ...mapActions(['getCourseMainInfo', 'getTestData']),
        toggleHandle() {
            this.toggleVideo = !this.toggleVideo
        },
    },
    //刷新页时watch无法监听，通过钩子函数隐藏header和footer
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$parent.navShow = false
            next()
        })
    },
}
</script>

<style lang="scss" scoped>
.course-learn-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: url('@/assets/img/courseLearn_bg.jpg');
    position: relative;
    .back-btn {
        cursor: pointer;
        border-radius: 4px;
        box-shadow: 2px 2px 2px #333;
        position: absolute;
        padding: 4px;
        top: 14px;
        left: 0;
        line-height: 24px;
        color: #484848;
        background-color: grey;
    }
    .course-info {
        position: absolute;
        top: 0;
        left: 140px;
        line-height: 24px;
        padding: 4px;
        font-size: 12px;
        color: #161616;
        span {
            margin-right: 5px;
        }
        span:last-child {
            color: #ccc;
        }
    }
}

.aside {
    display: inline-block;
}
</style>
