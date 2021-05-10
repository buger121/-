<template lang="pug">
    div(class="course-discuss-container")
        div(class="form")
            el-select(v-model="discussType" size="mini")
                el-option(v-for="item in options" :key="item.value" :label="item.value" :value="item.value")
            el-input(type="textarea" v-model="discussContent" :rows="2" placeholder="欢迎分享，鼓励原创")
            el-button(type="danger" size="mini") 发起讨论
        div(class="main")
            div(class="item")
                div(class="item-header")
                    img
                    span(class="info")
                        span Raykkit
                        span 4月15日
                        span 【综合讨论区】
                div(class="item-content")
                    span 老师的声音真好听！
</template>

<script>
export default {
    data() {
        return {
            discussType: '综合讨论区',
            options: [{ value: '老师答疑区' }, { value: '综合讨论区' }],
            discussContent: '',
        }
    },
}
</script>

<style lang="scss" scoped>
.course-discuss-container {
    padding: 14px 10px;
    background-color: #fff;
    .form {
        overflow: hidden;
        .el-textarea {
            margin: 10px 0;
        }
        .el-button {
            float: right;
        }
    }
    .main {
        color: #666;
        font-size: 12px;
        .item {
            .item-header {
                margin-bottom: 12px;
            }
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 18px;
            }
            .info {
                width: 240px;
                display: inline-block;
                vertical-align: top;
                position: relative;
                top: 8px;
                span:first-child {
                    color: $main-color;
                    margin-right: 12px;
                }
                span:last-child {
                    float: right;
                }
            }
            .item-content {
                font-size: 14px;
            }
        }
    }
}
</style>
