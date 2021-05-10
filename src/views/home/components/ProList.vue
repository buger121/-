<template lang="pug">
    div(class="profession-container")
        span(class="list-title-163")
            slot
        div(class="pro-list")
            div(class="pro-card" v-for="(item,index) in items" :key="index")
                div(class="img-wrapper")
                    img(:src="item.src")
                div(class="main-title") {{item.mainTitle}}
                div(class="sub-title") {{item.subTitle}}
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    src: require('@/assets/img/pro1.webp'),
                    mainTitle: 'UI设计师-全链路实战班',
                    subTitle: '打通全链路，成为独当一面的核心设计师',
                },
                {
                    src: require('@/assets/img/pro2.webp'),
                    mainTitle: 'UI设计师-全链路实战班',
                    subTitle: '打通全链路，成为独当一面的核心设计师',
                },
                {
                    src: require('@/assets/img/pro3.webp'),
                    mainTitle: 'UI设计师-全链路实战班',
                    subTitle: '打通全链路，成为独当一面的核心设计师',
                },
                {
                    src: require('@/assets/img/pro4.webp'),
                    mainTitle: 'UI设计师-全链路实战班',
                    subTitle: '打通全链路，成为独当一面的核心设计师',
                },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
.profession-container {
    width: $main-width;
    margin: 0 auto;
    margin-bottom: 20px;

    .pro-list {
        white-space: nowrap;
        display: flex;
        justify-content: space-around;
        .pro-card {
            padding-bottom: 15px;
            cursor: pointer;
            .img-wrapper {
                width: 100%;
                height: 161px;
                border-radius: 4px 4px 0 0;
                overflow: hidden;
            }
            img:hover {
                transform: scale(1.15);
                transition: all 0.2s linear;
            }
            img {
                transition: all 0.2s linear;
            }
            .main-title {
                font-size: 16px;
                height: 22px;
                line-height: 22px;
                margin: 0 0 3px 0;
                color: #333;
            }
            .sub-title {
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 14px;
                height: 16px;
                line-height: 16px;
                margin: 0;
                color: #666;
            }
        }
    }
}
</style>
