<template lang="pug">
    div(class="my-course-container")
        Tabs
            Tab(title="课程")
                div(class="tab my-course")
                    div(class="course-card" v-for="item in myCourses" :key="item.courseName" @click="toCoursePage(item.course_id)")
                        img(:src="item.banner_tiny")
                        div(class="main-info")
                            div(class="course-name") {{item.name}}
                            el-progress(:percentage="item.percentage")
                            div(class="progress-info") 已学习3/22课时
            Tab(title="收藏夹")
                div(class="tab my-collect")
                    div(class="course-card" v-for="item in myCollect" :key="item.courseName" @click="toCoursePage(item.course_id)")
                        img(:src="item.banner_tiny")
                        div(class="main-info")
                            div(class="course-name") {{item.name}}
                            el-progress(:percentage="item.percentage")
                            div(class="progress-info") 已学习3/22课时
</template>

<script>
import { mapActions } from 'vuex'
import Tabs from '@/components/common/tabs.vue'
import Tab from '@/components/common/tab.vue'
export default {
    components: { Tabs, Tab },
    data() {
        return {
            myCourses: [],
            myCollect: [],
        }
    },
    methods: {
        ...mapActions(['getCourse', 'getMyCollect']),
        toCoursePage(course_id) {
            this.$router.push({
                path: '/course/main',
                query: { courseId: course_id },
            })
        },
    },
    async created() {
        this.myCourses = await this.getCourse()
        this.myCollect = await this.getMyCollect()
    },
}
</script>

<style lang="scss" scoped>
.my-course-container {
    min-height: 70vh;
    ::v-deep.tabs__header {
        width: 100%;
        background-color: #fff;
        // position: relative;
        // top: -20px;
    }
    .tab {
        width: 1200px;
        margin: 0 auto;

        .course-card {
            display: inline-block;
            vertical-align: top;
            width: 220px;
            height: 240px;
            background-color: #fff;
            margin-top: 20px;
            margin-right: 20px;
            color: #333;
            &:hover {
                cursor: pointer;
                position: relative;
                bottom: 4px;
                transition: all 0.2s linear;
            }
            img {
                width: 220px;
                height: 90px;
                object-fit: cover;
            }
            .main-info {
                padding: 10px;
            }
            .course-name {
                height: 40px;
                margin-bottom: 30px;
            }
            .progress-info {
                margin-top: 12px;
                font-size: 14px;
                color: $main-color;
            }
        }
    }
}
</style>
