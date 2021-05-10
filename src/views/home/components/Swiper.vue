<template lang="pug">
    div(class="swiper-container")
        el-carousel(class="wrapper" height="400px" width="935px")
            el-carousel-item
                img(src="@/assets/img/swiper-1.jpg")
            el-carousel-item
                img(src="@/assets/img/swiper-2.png")
            el-carousel-item
                img(src="@/assets/img/swiper-3.jpg")
            el-carousel-item
                img(src="@/assets/img/swiper-4.png")

            
</template>

<script>
export default {
    data() {
        return {}
    },
}
</script>

<style lang="scss" scoped>
.swiper-container {
    display: inline-block;

    .wrapper {
        width: 935px;
        height: 400px;
        border-radius: 6px;

        v::deep .el-carousel__container {
            height: 400px;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
