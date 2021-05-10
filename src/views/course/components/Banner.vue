<template lang="pug">
    div(:class="{'banner': !courseData.isSignUp, 'banner-sign-up': courseData.isSignUp}" )
        div(class="img-container")
            img(:src="courseData.banner" v-show="!courseData.isSignUp")
            img(:src="courseData.banner_tiny" v-show="courseData.isSignUp")
        div(class="course-info")
            div(class="title") {{courseData.name}}
            div 主讲老师：{{courseData.teacher}}
            div 课时数量：{{courseData.hour}}
            div 开课时间：{{formatStartTime}}
            div 有效期至：{{formatEndTime}}
            div(class="sign-number") 
                span 已报名
                span(class="highlight-info") {{courseData.stu_number}}
                span 人
                span(class="seprator-163")
                span 报名还剩
                span(class="highlight-info") 2
                span 天
            div(class="sign-category")
                span 类别：
                span(class="course-category" v-for="item in courseData.category" :key="item") {{item}} 
            div(class="sign-up-btn" @click="signUpHandle")
                span 立即报名
                span(class="highlight-info") ￥{{courseData.price}}
            div(class="study-btn" @click="startLearn")
                span() 开始学习
</template>

<script>
import moment from 'moment'
export default {
    props: {
        isSignUp: Boolean,
        courseData: Object,
    },
    computed: {
        formatStartTime() {
            return moment(this.courseData.start_time).format(
                'YYYY-MM-DD HH:mm:ss'
            )
        },
        formatEndTime() {
            return moment(this.courseData.end_time).format(
                'YYYY-MM-DD HH:mm:ss'
            )
        },
    },
    methods: {
        signUpHandle() {
            this.$emit('sign-up')
        },
        startLearn() {
            // window.scrollTo(0, 460)
            // this.$emit('start-learn')
            this.$router.push({
                path: '/course/main',
                query: { courseId: this.courseData.course_id },
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.banner {
    position: relative;
    .img-container {
        margin: 0 auto;
        width: 100%;
        min-width: 1200px;
        height: 500px;
        overflow: hidden;
        img {
            margin: 0 auto;
            position: relative;
            height: 100%;
            // object-fit: cover;
            left: -250px;
        }
    }

    .course-info {
        width: 340px;
        position: absolute;
        left: 790px;
        top: 0;
        padding: 100px 30px;
        div {
            color: #fff;
            margin-bottom: 12px;
        }
        .title {
            text-align: left;
            font-size: 30px;
            font-weight: 400;
        }
        .highlight-info {
            color: #ffe400;
            font-weight: 700;
            margin: 0 3px;
        }
        .course-category {
            display: inline-block;
            padding: 2px 10px;
            cursor: pointer;
            font-size: 13px;
            line-height: 28px;
            border-radius: 2px;
            background: rgba(255, 255, 255, 0.42);
            margin-left: 4px;
            margin-bottom: 6px;
            text-align: center;
        }
        .sign-up-btn {
            height: 54px;
            line-height: 54px;
            font-weight: 700;
            font-size: 18px;
            background: #fb4a3e;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            cursor: pointer;
        }
        .study-btn {
            display: none;
        }
    }
}
.banner-sign-up {
    width: 950px;
    height: 260px;
    margin: 60px auto;
    position: relative;
    border-radius: 2px;
    .img-container {
        display: inline-block;
        overflow: hidden;
        width: 415px;
        height: 270px;
        img {
            height: 100%;
            object-fit: cover;
        }
    }
    .course-info {
        height: 250px;
        padding: 10px 25px;
        background-color: #fff;
        display: inline-block;
        vertical-align: top;
        .title {
            font-size: 30px;
            font-weight: 500;
        }
        div {
            font-size: 14px;
            margin-bottom: 5px;
            color: #525252;
        }
        .sign-number {
            display: none;
        }
        .sign-category {
            display: none;
        }
        .sign-up-btn {
            display: none;
        }
        .study-btn {
            width: 176px;
            height: 54px;
            line-height: 54px;
            margin-top: 22px;
            cursor: pointer;
            background: #b9b9b9;
            font-size: 20px;
            color: #fff;
            text-align: center;
            border-radius: 2px;
        }
    }
}
</style>
