<template lang="pug">
    div(calss="course-main-container")
        div(class="banner")
            div(class="course-info")
                img(src="@/assets/img/courseMain.jpg")
                div(class="course-detail")
                    div(class="title") HTML5入门
                    div(class="rate")
                        el-rate(v-model="rate" disabled show-score text-color="#ff9900")
                    div(class="detail")
                        span 16.1万人学过
                        span 讲师：翁恺
                div(class="tool-bar" )
                    i(class="el-icon-share")
                    i(class="el-icon-star-off")
                    i(class="el-icon-info")
            div(class="tabs" @click="switchTab")
                div(class="tab" :class="{active: activeIndex === 1}" data-index="1") 主页
                div(class="tab" :class="{active: activeIndex === 2}" data-index="2") 笔记
                div(class="tab" :class="{active: activeIndex === 3}" data-index="3") 讨论区
        div(class="tab-container" v-show="activeIndex === 1")
            MainInfo(:infoData="mainData")
        div(class="tab-container" v-show="activeIndex === 2")
            CourseNote(:courseInfo="mainData.info" :notesData="notesData")
        div(class="tab-container" v-show="activeIndex === 3")
            CourseForum
            

</template>

<script>
import MainInfo from './components/MainInfo.vue'
import CourseNote from './components/CourseNote.vue'
import CourseForum from './components/CourseForum.vue'
import { mapActions, mapMutations } from 'vuex'
export default {
    components: { MainInfo, CourseNote, CourseForum },
    data() {
        return {
            activeIndex: 1,
            rate: 5,
            mainData: {
                info: {},
            },
            notesData: [],
            disscussData: {},
            courseId: 0,
        }
    },
    methods: {
        ...mapActions(['getCourseMainInfo', 'getCourseNotesData']),
        ...mapMutations(['SET_COURSE_INFO']),
        switchTab(e) {
            const tab = e.target
            this.activeIndex = Number(tab.getAttribute('data-index'))
            //切换tab时，访问接口，获取数据
            switch (this.activeIndex) {
                case 1:
                    this.getMainData()
                    break
                case 2:
                    this.getNotesData()
                    break
                case 3:
                    this.getDiscussData()
                    break
            }
        },
        async getMainData() {
            const data = await this.getCourseMainInfo(this.courseId)
            this.mainData = data
            this.SET_COURSE_INFO(data)
        },
        async getNotesData() {
            const data = await this.getCourseNotesData(this.courseId)
            this.notesData = data
        },
        async getDiscussData() {
            const data = await this.getCourseDiscussData(this.courseId)
            this.disscussData = data
        },
    },
    async created() {
        this.courseId = this.$route.query.courseId
        this.getMainData()
    },
}
</script>

<style lang="scss" scoped>
.banner {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    .course-info {
        padding: 20px 15px;

        img {
            width: 450px;
            height: 250px;
            box-shadow: 5px 5px 5px #eee;
        }
        .course-detail {
            display: inline-block;
            vertical-align: top;
            margin-left: 20px;
            .title {
                color: #333;
                font-size: 24px;
                line-height: 1.2;
                margin-bottom: 20px;
            }
            .rate {
                margin-bottom: 12px;
            }
            .detail {
                color: #999;
                font-size: 12px;
                span:last-child {
                    margin-left: 20px;
                }
            }
        }
        .tool-bar {
            float: right;
            border: 1px solid #eee;
            i {
                padding: 5px 10px;
                cursor: pointer;
            }
            i:hover {
                background-color: #eee;
                color: $main-color;
            }
            i:not(:last-child) {
                border-right: 1px solid #eee;
            }
        }
    }
    .tabs {
        background-color: #fafafa;
        border-top: 1px solid #eaeaea;
        div {
            display: inline-block;
            cursor: pointer;
            font-size: 14px;
            margin: 6px 14px;
            padding: 4px 10px;
            border-radius: 4px;
        }
        .active {
            color: #fff;
            background-color: #555;
        }
        .tab:hover {
            color: $main-color;
        }
        .tab.active:hover {
            color: #fff;
        }
    }
}
</style>
