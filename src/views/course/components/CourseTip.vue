<template lang="pug">
    div(class="course-tip-wrapper")
        div(class="header")
            i(class="el-icon-bell")
            span 课程提示
        ul(class="main")
            div(class="tip-item" v-for="item in itemList" :key="item.text")
                div(class="dot")
                el-tooltip(class="item" effect="dark" :content="item.content" placement="left")
                    li {{item.text}}
 
</template>

<script>
export default {
    data() {
        return {
            itemList: [
                {
                    text: '如何查看已购课程',
                    content: '进入官网，点击进入【我的学习】',
                },
                { text: '课程购买后可以更换吗', content: 'tip' },
                { text: '直播结束后会有回放吗', content: 'tip' },
                { text: '无法登录怎么办', content: 'tip' },
                { text: '如何用手机听课', content: 'tip' },
                { text: '课程过期了怎么办', content: 'tip' },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
.course-tip-wrapper {
    width: 250px;
    padding: 20px 25px;
    background-color: #fff;
    .header {
        height: 40px;
        border-bottom: 1px solid #eee;
        font-weight: 400;
        color: #283237;
        font-size: 18px;
        .el-icon-bell {
            margin-right: 8px;
            color: #ffe400;
        }
    }
    .main {
        margin-top: 10px;
        font-size: 16px;
        line-height: 31px;
        cursor: pointer;
        color: #65676e;
        .dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            background-color: #65676e;
            opacity: 0.5;
            border-radius: 50%;
            margin-right: 8px;
        }
        li {
            display: inline-block;
        }
    }
}
</style>
