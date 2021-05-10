<template lang="pug">
    div(class="tabs")
                Tabs
                    Tab(title="课程介绍" @click="switchTag")
                        div(class="tab-content course-intro")
                            div(class="img-wrapper")
                                img(:src="courseData.intro")
                    Tab(title="课程表")
                        div(class="tab-content course-list")
                            div(v-for="(item, index) in courseList" :key="item.title" class="item")
                                div(class="number") {{index + 1 | serialize}}
                                div(class="title") {{item.title}}
                                div(class="desc") {{item.desc}}
                                div(class="play-btn" v-if="courseData.isSignUp") 开始学习
                    Tab(title="评价")
                        div(class="tab-content comment")
                            div(class="comment-item" v-for="comment in commentList" :key="comment.username")
                                div(class="header")
                                    span {{comment.username}}
                                    span {{comment.time}}
                                div(class="main")
                                    span {{comment.content}}

</template>

<script>
import Tabs from '@/components/common/tabs.vue'
import Tab from '@/components/common/tab.vue'
export default {
    components: { Tabs, Tab },
    props: {
        courseData: Object,
        learnMode: Boolean,
    },
    watch: {
        learnMode: function(val) {
            //TODO
        },
    },
    data() {
        return {
            courseList: [
                {
                    title: 'Day1：听力口语 独家秘籍',
                    desc: '04.20 20:00 - 22:00',
                },
                {
                    title: 'Day2：偷懒技巧 突破瓶颈',
                    desc: '04.21 20:00 - 22:00',
                },
                {
                    title: 'Day3：生活场景 实战演绎',
                    desc: '04.22 20:00 - 22:00',
                },
            ],
            commentList: [
                {
                    username: '星梦',
                    time: '2020-04-27 13:50',
                    content: '谢谢老师，收获很大！',
                },
                {
                    username: '学员db0b',
                    time: '2020-04-30 21:00',
                    content: '老师牛牛牛牛',
                },
            ],
        }
    },
    methods: {
        switchTag() {
            //点击标签时，视图滚动，标签在页面顶部
        },
    },
    filters: {
        serialize: function(value) {
            if (!value) return ''
            if (value < 10) {
                value = '0' + value
            }
            return value
        },
    },
}
</script>

<style lang="scss" scoped>
.tabs {
    margin-top: 25px;
    width: 840px;
    background-color: #fff;
    display: inline-block;

    .tab-content {
        width: 90%;
        display: block;
        margin: 25px auto;
    }

    .course-list {
        .item:first-child {
            border-top: 1px solid #f5f5f5;
        }
        .item {
            position: relative;
            border-bottom: 1px solid #f5f5f5;
            padding: 18px 0;
            .number {
                display: inline-block;
                font-size: 16px;
                color: #a7b0b8;
                margin-right: 20px;
            }
            .title {
                display: inline-block;
                font-size: 16px;
                color: #31404c;
                font-weight: 700;
                margin-bottom: 10px;
            }
            .desc {
                font-size: 12px;
                color: #a7b0b8;
                margin-left: 40px;
            }
            .play-btn {
                cursor: pointer;
                position: absolute;
                padding: 8px 10px;
                border-radius: 4px;
                right: 10px;
                top: 20px;
                background-color: #fb4a3e;
                color: #fff;
            }
        }
    }

    .comment {
        display: flex;
        flex-direction: column;
        .comment-item {
            margin-bottom: 40px;
        }
        .header {
            display: flex;
            justify-content: space-between;
            color: #4f4f4f;

            font-size: 13px;
            margin-bottom: 20px;
        }
        .main {
            font-size: 14px;
            font-size: #8d8d8d;
        }
    }
}
</style>
