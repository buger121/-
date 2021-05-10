<template lang="pug">
    div(class="course-detail-wrapper")
        Banner(@sign-up="signUpHandle" :isSignUp="isSignUp" :courseData="courseData" @start-learn="startLearnHandle")
        SignUpDialog(@close-dialog="closeDialogHandle" v-show="showSignUpDialog"  :courseData="courseData")
        div(class="main")
            CourseTabs(:courseData="courseData" :learnMode="learnMode")
            div(class="aside")
                CourseTip
                CourseRelative

</template>

<script>
import Banner from './components/Banner.vue'
import CourseTabs from './components/CourseTabs.vue'
import CourseTip from './components/CourseTip.vue'
import CourseRelative from './components/RelativeCourse.vue'
import SignUpDialog from './components/SignUpDialog.vue'
import { mapActions, mapMutations } from 'vuex'
export default {
    components: { Banner, CourseTabs, CourseTip, CourseRelative, SignUpDialog },
    data() {
        return {
            showSignUpDialog: false,
            isSignUp: false, //记录当前课程是否已报名
            courseData: {},
            learnMode: false,
        }
    },
    methods: {
        ...mapActions(['getCourseDetail']),
        ...mapMutations(['SET_COURSE_INFO']),
        signUpHandle() {
            this.showSignUpDialog = true
        },
        closeDialogHandle() {
            this.showSignUpDialog = false
        },
        startLearnHandle() {
            this.learnMode = true
        },
    },
    async created() {
        const course_id = this.$route.params.course_id
        this.courseData = await this.getCourseDetail(course_id)
        this.SET_COURSE_INFO(this.courseData)
    },
}
</script>

<style lang="scss" scoped>
.main {
    margin-top: 20px;
    width: 1200px;
    margin: 0 auto;
}
.aside {
    margin: 20px 0 0 30px;
    display: inline-block;
    vertical-align: top;
}
</style>
