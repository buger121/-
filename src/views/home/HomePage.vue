<template lang="pug">
    div(class="container")
        div(:class="{'overlay-163': showOverlay}")
        div(class="main")
            Category
            Swiper
        CourseList 精品课
        ProList 微专业
        Recommend(:showDialog="showDialog" @close-dialog="closeDialog" @open-dialog="openDialog")
        CourseList 新课推荐
</template>

<script>
import Swiper from './components/Swiper.vue'
import Category from './components/Category.vue'
import CourseList from './components/CourseList.vue'
import ProList from './components/ProList.vue'
import Recommend from './components/Recommend.vue'
export default {
    components: { Swiper, Category, CourseList, ProList, Recommend },
    data() {
        return {
            showOverlay: false,
            showDialog: false,
        }
    },
    methods: {
        closeDialog() {
            this.showOverlay = false
            this.showDialog = false
        },
        openDialog() {
            this.showOverlay = true
            this.showDialog = true
        },
    },
}
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    flex-wrap: nowrap;
    margin: 0 auto;
    margin-bottom: 20px;
    width: $main-width;
}
</style>
