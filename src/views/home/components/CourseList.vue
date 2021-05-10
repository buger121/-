<template lang="pug">
    div(class="course-container")
        span(class="list-title-163")
            slot
        div(class="course-list")
            CourseCard(v-for="item in courseListData" :key="item.id" :cardData="item" @click.native="courseDetail(item.id)")
        

</template>

<script>
import CourseCard from './CourseCard.vue'
export default {
    components: { CourseCard },
    data() {
        return {
            courseListData: [
                {
                    imgSrc: require('@/assets/img/course.png'),
                    cate1: '自营',
                    cate2: '考研',
                    name: '22考研400分突破营',
                    time: '2021-03-31 19:00:00',
                    hour: '6',
                    teachers: ['王一敏', '赵楠楠', '刘亚男'],
                    bought: '1104',
                    oldPrice: '499',
                    newPrice: '免费',
                    id: '4086',
                },
                {
                    imgSrc: require('@/assets/img/course2.png'),
                    cate1: '自营',
                    cate2: '专四专八',
                    name: '21专四全面通关计划',
                    time: '2021-04-06 19:00:00',
                    hour: '3',
                    teachers: ['王菲', '家坤', '黎旭'],
                    bought: '373',
                    oldPrice: '99',
                    newPrice: '免费',
                    id: '4087',
                },
                {
                    imgSrc: require('@/assets/img/course.png'),
                    cate1: '自营',
                    cate2: '考研',
                    name: '22考研400分突破营',
                    time: '2021-03-31 19:00:00',
                    hour: '6',
                    teachers: ['王一敏', '赵楠楠', '刘亚男'],
                    bought: '1104',
                    oldPrice: '499',
                    newPrice: '免费',
                },
                {
                    imgSrc: require('@/assets/img/course2.png'),
                    cate1: '自营',
                    cate2: '专四专八',
                    name: '21专四全面通关计划',
                    time: '2021-04-06 19:00:00',
                    hour: '3',
                    teachers: ['王菲', '家坤', '黎旭'],
                    bought: '373',
                    oldPrice: '99',
                    newPrice: '免费',
                },
            ],
        }
    },
    methods: {
        courseDetail(courseId) {
            this.$router.push(`/course/detail/${courseId}`)
        },
    },
}
</script>

<style lang="scss" scoped>
.course-container {
    margin-top: 24px 0;
    width: $main-width;
    margin: 0 auto;
}
.course-list {
    white-space: nowrap;
    display: flex;
    justify-content: space-around;
}
</style>
