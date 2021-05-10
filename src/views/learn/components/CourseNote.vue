<template lang="pug">
    div(class="course-note-container")
        div(class="tabs" @click="switchTab")
            span(:class="{active: activeTab===1}" data-index="1") 我的笔记
            span(:class="{active: activeTab===2}" data-index="2") 精选笔记
        div(class="tab my-note" v-show="activeTab === 1")
            el-input(type='textarea' :rows="2" v-model="noteContent" placeholder="在此记录你的想法...")
            el-button(type="danger" size="mini") 保存
        div(class="tab selected" v-show="activeTab === 2")
            div(class="se-header")
                img
                span(class="username") 小橙婷
            div(class="se-content")
                span 概念:用来说明排版的语言
            div(class="tool")
                span(class="like")
                    i(class="el-icon-s-opportunity")
                    span 顶（55）
                span(class="comment")
                    i(class="el-icon-s-comment")
                    span 评论（6）
                span(class="collect")
                    i(class="el-icon-star-off")
                    span 收藏
                span(class="share")
                    i(class="el-icon-share")
                    span 分享
            div(class="time") 2014-12-19
</template>

<script>
export default {
    data() {
        return {
            activeTab: 2,
            noteContent: '',
        }
    },
    methods: {
        switchTab(e) {
            const index = Number(e.target.getAttribute('data-index'))
            this.activeTab = index
        },
    },
}
</script>

<style lang="scss" scoped>
.course-note-container {
    background-color: #fff;
    .tabs {
        display: flex;
        justify-content: space-around;
        span {
            cursor: pointer;
            display: inline-block;
            padding-top: 4px;
            padding-bottom: 6px;
            border-bottom: 1px solid #eee;
        }
        .active {
            border-bottom: 1px solid $main-color;
        }
    }
    .tab {
        padding: 12px 10px;
    }
    .my-note {
        overflow: hidden;
        border-bottom: 1px solid #eee;

        .el-button {
            float: right;
            margin-top: 8px;
        }
    }
    .selected {
        .se-header {
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            .username {
                display: inline-block;
                vertical-align: top;
                color: $main-color;
                margin-left: 20px;
                position: relative;
                top: 5px;
            }
        }
        .se-content {
            margin-top: 12px;
            color: #666;
            font-size: 14px;
            word-wrap: break-word;
            white-space: pre-wrap;
        }
        .tool {
            margin-top: 6px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #999;
            span {
                cursor: pointer;
            }
            span:hover {
                color: $main-color;
            }
        }
        .time {
            color: #999;
            font-size: 12px;
            margin-top: 3px;
        }
    }
}
</style>
