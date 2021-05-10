<template lang="pug">
    div(class="relative-course")
        div(class="header")
            i(class="el-icon-collection")
            span 该班同学还报名
            span(class="more-course") 更多>>
        div(class="main")
            div(class="course-item")
                span 词汇之旅：大学核心必修词 2期
                span(class="price") ￥399
</template>

<style lang="scss" scoped>
.relative-course {
    width: 250px;
    padding: 20px 25px;
    background-color: #fff;
    margin-top: 35px;
    .header {
        height: 40px;
        border-bottom: 1px solid #eee;
        font-weight: 400;
        color: #283237;
        font-size: 16px;
        .el-icon-collection {
            margin-right: 8px;
            color: #ffe400;
        }
        .more-course {
            float: right;
            color: $main-color;
            cursor: pointer;
        }
    }
    .main {
        .course-item {
            margin-top: 15px;
            background-color: #f5f9fd;
            height: 70px;
            padding: 10px;
            position: relative;
            cursor: pointer;
        }
        .price {
            position: absolute;
            right: 5px;
            bottom: 5px;
            color: $main-color;
            display: inline-block;
            padding: 3px 10px;
            border: 1px solid $main-color;
            border-radius: 20px;
            font-size: 15px;
        }
    }
}
</style>
