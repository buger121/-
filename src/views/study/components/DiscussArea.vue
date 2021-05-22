<template lang="pug">
    div(class="discuss-area-container")
        div(class="discuss-area")
            div(class="breads")
                span(@click="backToAll") 讨论区
                span >
                span {{areaName}}
            div(class="intro-info")
                div(class="info-title") {{areaName}}
                div(class="intro-content") 你可以将学习过程中关于课程内容、学习方法、应用效果等问题发布在本区，课程讲师和同学将会为你答疑解惑。
                div(class="select-form")
                    span 排序：
                    el-select(v-model="sortBy" placeholder="最近发布" size="mini")
                        el-option(v-for="item in sortOptions"  :key="item.value" :label="item.label" :value="item.value")
            div(class="discuss-main")
                div(class="discuss-item" v-for="item in discussData")
                    DiscussItem(:item="item" @update-discuss-data="updateDiscussData")
        div(class="start-discuss")
            div(class="start-btn") 
                i(class="el-icon-chat-dot-round")
                span 发起讨论
            div(class="start-form")
                el-select(v-model="discussArea" size="mini" placeholder="选择发布版块")
                    el-option(v-for="item in discussOptions"  :key="item.value" :label="item.label" :value="item.value")
                el-button(type="danger" size="mini" @click="releaseDiscuss") 发布讨论
                
                el-input(size="mini" v-model="discussContent")

</template>

<script>
import { mapActions } from 'vuex'
import DiscussItem from './DiscussItem.vue'
export default {
    components: { DiscussItem },
    data() {
        return {
            sortBy: '',
            discussArea: '',
            discussContent: '',
            sortOptions: [
                { value: 'time', label: '最近发布' },
                { value: 'view', label: '浏览数' },
                { value: 'like', label: '点赞数' },
                { value: 'reply', label: '回复数' },
            ],
            discussOptions: [
                { value: 1, label: '老师答疑区' },
                { value: 2, label: '综合答疑区' },
            ],
        }
    },
    props: {
        areaType: String,
        discussData: Array,
    },
    computed: {
        areaName: function() {
            if (this.areaType === 'teacher') {
                return '老师答疑区'
            } else {
                return '综合讨论区'
            }
        },
    },
    methods: {
        ...mapActions(['releaseCourseDiscuss']),
        backToAll() {
            this.$emit('back-to-all')
        },
        updateDiscussData() {
            this.$emit('update-discuss-date')
        },
        async releaseDiscuss() {
            const courseId = Number(this.$route.query.courseId)
            const res = await this.releaseCourseDiscuss({
                courseId,
                discussArea: this.discussArea,
                content: this.discussContent,
            })
            if (res.success === true) {
                this.$message({
                    type: 'success',
                    message: '发起讨论成功！',
                })
                //通知父组件刷新数据
                this.updateDiscussData()
                this.discussArea = ''
                this.discussContent = ''
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.discuss-area {
    display: inline-block;
    width: 900px;
    background-color: #fff;
    color: #666;
    font-size: 14px;

    .breads {
        line-height: 40px;
        border-bottom: 1px solid #999;
        span {
            cursor: default;
        }
        span:nth-child(1) {
            padding-left: 20px;
            cursor: pointer;
        }
        span:nth-child(2) {
            margin: 0 8px;
        }
    }
    .intro-info {
        margin: 0 20px;
        overflow: hidden;
        border-bottom: 1px solid #999;
        .info-title {
            font-size: 20px;
            line-height: 40px;
        }
        .select-form {
            float: right;
            margin: 20px;
        }
    }
    .discuss-main {
        .discuss-item {
            margin: 20px;
            border-bottom: 1px solid #eee;
            .item-header {
                img {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                }
                span {
                    vertical-align: top;
                    margin: 0 10px;
                }
                .username {
                    color: $main-color;
                }
            }
            .item-content {
                margin: 16px 0 12px 0;
            }
            .item-footer {
                overflow: hidden;
                margin-bottom: 10px;
                .tool-bar {
                    float: right;
                    span {
                        cursor: pointer;
                        margin-right: 6px;
                    }
                }
            }
        }
    }
}
.start-discuss {
    width: 280px;
    margin-left: 20px;
    display: inline-block;
    vertical-align: top;
    .start-btn {
        vertical-align: top;
        background-color: #ff3f29;
        line-height: 40px;
        text-align: center;
        flex-wrap: nowrap;
        color: #fff;
        box-sizing: border-box;
        cursor: pointer;
        box-shadow: 2px 2px 2px #aeaeae;
    }
    .el-select {
        margin-top: 10px;
    }
    .el-input {
        margin-top: 10px;
    }
    .el-button {
        margin-left: 12px;
        margin-top: 10px;
    }
}
</style>
