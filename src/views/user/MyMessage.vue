<template lang="pug">
    div(class="my-message-container")
        div(class="tabs-aside")
            div(class="tab" :class="{active: this.activeTab===1}" @click="changeTab(1)")
                span 课程提醒
            div(class="tab" :class="{active: this.activeTab===2}" @click="changeTab(2)")
                span 互动提醒
        div(class="main-content")
            div(class="course-message" v-show="this.activeTab===1")
                span(class="course-message-content") 暂无消息
            div(class="inter-message" v-show="this.activeTab===2")
                div(class="message-item" v-for="item in userMessage" :key="item.interactiveId" @click="toCourse(item.courseId)")
                    span 你的讨论：
                    span(class="item-content") “{{item.content}}”
                    span 有了新的回复
                    span(class="unread-icon" v-show="item.viewed === 1")

            
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            activeTab: 1,
        }
    },
    async mounted() {
        //设置所有维度消息为已读
        await this.readAllMessage()
    },
    computed: {
        ...mapState({ userMessage: state => state.user.userMessage }),
    },
    methods: {
        ...mapActions(['readAllMessage']),
        changeTab(index) {
            this.activeTab = index
        },
        toCourse(courseId) {
            this.$router.push({ path: '/course/main', query: { courseId } })
        },
    },
}
</script>

<style lang="scss" scoped>
.my-message-container {
    width: 1200px;
    margin: 0 auto;
    .tabs-aside {
        background-color: #fff;
        display: inline-block;
        margin-right: 20px;
        .tab {
            width: 265px;
            height: 50px;
            line-height: 50px;
            text-align: left;
            padding-left: 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            color: #333;
            cursor: pointer;
        }
        .active {
            color: #fff;
            background-color: $main-color;
        }
    }
    .main-content {
        min-height: 400px;
        background-color: #fff;
        display: inline-block;
        width: 900px;
        vertical-align: top;
        .course-message {
            min-height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .message-item {
            font-size: 14px;
            color: #444;
            padding: 10px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            .unread-icon {
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: $main-color;
                margin-left: 6px;
            }
            .item-content {
                margin: 0 6px;
                color: #999;
            }
        }
    }
}
</style>
