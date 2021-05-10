<template lang="pug">
    div(class="cate-container" @mouseover="hoverHandle" @mouseleave="hover = false")
        div(class="item" v-for="(item, index) in listData" :key="index" @click="chooseCourseHandle")
            span(v-for="(value, key) in item" :key="key")
                span(class="title" :data-key="key") {{key}} 
                span(v-for="(content, index) in value" :key="index")
                    span(v-for="(detValue, detKey) in content" :key="detKey")
                        span(class="seprator") / 
                        span(class="sub-title" :data-key="key")  {{detKey}} 
        div(class="hover-wrapper" v-show="hover")
            div(v-for="(items, title) in hoverData" :key="title") 
                span(class="main-title") {{title}} >
                div(class="hover-content")
                    div(class="hover-item" v-for="(item, index) in items" :key="index")
                        div(v-for="(value, key) in item") 
                            span(class="item-key") {{key}}
                            span( v-for="name in value" :key="name") 
                                span(class="seprator") 
                                span(class="item-detail") {{name}}


</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            hover: false,
            hoverData: [],
            listData: [],
        }
    },
    async created() {
        this.listData = await this.getCourseListService()
    },
    methods: {
        ...mapActions(['getCourseListService']),
        hoverHandle(e) {
            this.hover = true
            const key = e.target.getAttribute('data-key')
            if (key) {
                this.hoverData = this.listData[key]
                const [res] = this.listData.filter(
                    item => Object.keys(item).indexOf(key) !== -1
                )
                this.hoverData = res
            }
        },
        chooseCourseHandle(e) {
            const category = e.target.getAttribute('data-key')
        },
    },
}
</script>

<style lang="scss" scoped>
.cate-container {
    box-sizing: border-box;
    margin-right: 15px;
    width: 260px;
    border-radius: 6px;
    background-color: #fff;
    padding: 20px 10px;
    font-size: 14px;
    font-family: PingFang SC;
    cursor: pointer;
    display: inline-block;
    height: 400px;
    position: relative;

    .item {
        margin-bottom: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #666;
    }

    .title {
        font-weight: 600;
        margin-right: 8px;
    }
    .title:hover {
        color: $main-color;
        text-decoration: underline;
    }
    .sub-title:hover {
        color: $main-color;
        text-decoration: underline;
    }
    .sub-title {
        color: #666;
    }
    .seprator {
        color: #666;
    }
}
.hover-wrapper {
    position: absolute;
    box-sizing: border-box;
    left: 260px;
    top: 0;
    width: 600px;
    height: 400px;
    padding: 15px;
    background-color: #fff;
    box-shadow: -1px 0px 2px rgba($color: #000, $alpha: 0.5);
    border-radius: 6px;
    z-index: 9;
    .main-title {
        font-size: 14px;
        line-height: 34px;
        padding: 8px;
        color: $main-color;
        background-color: rgba(255, 63, 41, 0.1);
    }
    .main-title:hover {
        background-color: $main-color;
        color: #fff;
    }
    .hover-content {
        display: block;
        margin-top: 20px;
        .hover-item {
            margin-bottom: 16px;
        }

        .item-key {
            margin-right: 12px;
            font-size: 14px;
            color: rgb(52, 61, 66);
        }
        .item-key:hover {
            color: $main-color;
            text-decoration: underline;
        }
        .item-detail {
            color: #666;
            font-size: 12px;
            line-height: 20px;
            margin: 0 10px;
        }
        .item-detail:hover {
            color: $main-color;
            text-decoration: underline;
        }
        .seprator {
            display: inline-block;
            width: 1px;
            height: 10px;
            background: #d2d2d2;
        }
    }
}
</style>
