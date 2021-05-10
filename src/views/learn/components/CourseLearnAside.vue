<template lang="pug">
    div(class="course-learn-aside-container" :class="{fold: asideFold === true}")
        div(class="toggleBtn" @click="toggleAsideHandle")
            i(class="el-icon-s-unfold" v-show="asideFold")
            i(class="el-icon-s-fold" v-show="!asideFold")
        div(class="header")
            div(class="info")
                div(class="title") {{courseDetail.name}}
                div(class="rate")
                    el-rate(v-model="value")
                div(class="teacher") 发布者:{{courseDetail.teacher}}
            img(:src="courseDetail.banner_tiny")
        div(class="tabs" )
            span(class="tab" :class="{active: activeTab === 1}" data-index="1" @click="changeTab")
                i(class="el-icon-tickets")
                span 目录
            span(class="tab" :class="{active: activeTab === 2}" data-index="2" @click="changeTab")
                i(class="el-icon-chat-dot-square")
                span 讨论
            span(class="tab" :class="{active: activeTab === 3}" data-index="3" @click="changeTab")
                i(class="el-icon-edit")
                span 笔记
        div(class="tab-container" v-if="activeTab === 1")
            CourseCatalog(:catalogData="courseData.res_catalog")
        div(class="tab-container" v-if="activeTab === 2")
            CourseDiscuss
        div(class="tab-container" v-if="activeTab === 3")
            CourseNote
</template>

<script>
import CourseCatalog from './CourseCatalog.vue'
import CourseDiscuss from './CourseDiscuss.vue'
import CourseNote from './CourseNote.vue'
import { mapActions, mapMutations } from 'vuex'
export default {
    props: {
        courseInfo: Object,
        courseData: Object,
    },
    components: { CourseCatalog, CourseDiscuss, CourseNote },
    data() {
        return {
            value: null,
            activeTab: 1,
            asideFold: true,
            courseDetail: {},
        }
    },
    async created() {
        //获取课程详情
        this.courseDetail = await this.getCourseDetail(this.courseInfo.courseId)
        // const lessonData = await this.getLessonData(this.courseInfo.lessonId)
        this.SET_COURSE_INFO(this.courseData)
    },
    methods: {
        ...mapActions(['getCourseMainInfo', 'getCourseDetail']),
        ...mapMutations(['SET_COURSE_INFO']),
        changeTab(e) {
            const index = Number(e.currentTarget.getAttribute('data-index'))
            this.activeTab = index
        },
        toggleAsideHandle() {
            this.asideFold = !this.asideFold
            this.$emit('toggle-aside')
        },
    },
}
</script>

<style lang="scss" scoped>
.course-learn-aside-container.fold {
    right: 0;
}
.course-learn-aside-container {
    width: 320px;
    position: absolute;
    right: -320px;
    top: 0;
    transition: right 0.4s linear;
}
.toggleBtn {
    width: 40px;
    text-align: center;
    cursor: pointer;
    line-height: 28px;
    background-color: #abadb0;
    position: absolute;
    left: -40px;
    top: 20px;
    border-radius: 4px 0 0 4px;
}
.header {
    height: 67px;
    padding: 15px;
    background-color: #abadb0;
    .info {
        display: inline-block;
        vertical-align: top;
    }
    .title {
        font-size: 12px;
        color: #333;
        margin-bottom: 8px;
        width: 130px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .teacher {
        margin-top: 4px;
        font-size: 12px;
        color: #666;
    }
    img {
        display: inline-block;
        width: 120px;
        height: 66px;
        margin-left: 22px;
    }
}
.tabs {
    height: 45px;
    background-color: #ddd;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    box-sizing: border-box;
    font-size: 14px;
    color: #666;
    .tab {
        display: inline-block;
        padding: 4px 6px;
        border-radius: 4px;
        cursor: pointer;
        i {
            margin-right: 4px;
        }
    }
    .active {
        background-color: #666;
        color: #fff;
    }
}
</style>
