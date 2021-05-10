<template lang="pug">
    div(class="course-catalog-container")
        div(v-for="(chapter, index) in catalogData" :key="index")
            div(class="chapter-header")
                span 章节
                span(class="course-index") {{index + 1}}
                //- span HTML介绍
            div(class="course-item" v-for="item in chapter" :key="item.lessonId" :class="{active: item.lessonId === currentLessonId}" @click="goToLesson(item.lessonId)")
                span(class="course-num") 课时{{item.courseNum}}
                span(class="course-name") {{item.courseTitle}}
                span(class="fr")
                    span {{item.courseLength | timeFormat}}
                    i(class="el-icon-video-play")
            
</template>

<script>
export default {
    props: {
        catalogData: Array,
    },
    computed: {
        currentLessonId: function() {
            return Number(this.$route.query.lessonId)
        },
    },
    methods: {
        goToLesson(lessonId) {
            const query = this.$route.query
            const newQuery = JSON.parse(JSON.stringify(query))
            newQuery.lessonId = lessonId
            try {
                this.$router.push({ path: '', query: newQuery })
                this.$router.go(0)
            } catch (err) {
                //避免重复路由错误
            }
        },
    },
    filters: {
        timeFormat: function(value) {
            return value.slice(0, 5)
        },
    },
}
</script>

<style lang="scss" scoped>
.course-catalog-container {
    background-color: #fff;

    .chapter-header {
        padding: 0 12px;
        height: 40px;
        color: #666;
        font-size: 14px;
        font-weight: bolder;
        cursor: default;
        line-height: 40px;
        .course-index {
            line-height: 14px;
            margin: 0 6px;
            display: inline-block;
            padding: 6px 8px;
            border: 1px solid #666;
            border-radius: 50%;
        }
    }
    .course-item {
        padding: 0 12px;
        transition: background-color 0.2s linear;
        color: #999;
        font-size: 12px;
        line-height: 34px;
        .course-num {
            margin-right: 20px;
        }
    }
    .fr {
        float: right;
        i {
            margin-left: 10px;
        }
    }
    .course-item:hover {
        box-sizing: border-box;
        cursor: pointer;
        background-color: #555;
        color: #fff;
        transition: background-color 0.2s linear;
    }
    .course-item.active {
        background-color: #555;
    }
}
</style>
