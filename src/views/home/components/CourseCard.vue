<template lang="pug">
    div(class="course-card")
            img(:src="cardData.imgSrc")
            div(class="detail")
                div(class="course-name")
                    span(class="category") {{this.cardData.cate1}}
                    span(class="category") {{this.cardData.cate2}}
                    span(class="name") {{this.cardData.name}}
                div(class="desc")
                    span 时间：{{this.cardData.time}}
                    span(class="seprator-163")
                    span {{this.cardData.hour}}课时
                    div(class="teacher") 导师：{{this.cardData.teachers.toString().replaceAll(',', ' ')}}
                div(class="buyer")
                    span(class="left") 已有{{this.cardData.bought}}人购买
                    span(class="right")
                        span ￥{{this.cardData.oldPrice}}
                        span {{this.cardData.newPrice}}
</template>

<script>
export default {
    props: {
        cardData: Object,
    },
    data() {
        return {}
    },
}
</script>

<style lang="scss" scoped>
.course-card {
    min-width: 280px;
    height: 351px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 8px;
    font-family: PingFang SC;
    overflow: hidden;
    display: inline-block;
    margin-right: 15px;
    cursor: pointer;
    position: relative;
    top: 0;
    img {
        width: 100%;
        height: 164px;
    }
    .detail {
        padding: 12px;
        .course-name {
            height: 48px;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 16px;
            color: #333;
            margin-bottom: 12px;
            .category {
                height: 17px;
                line-height: 17px;
                font-size: 12px;
                display: inline-block;
                padding: 0 4px;
                margin-right: 6px;
                color: #fff;
                border-radius: 3px;
                background: rgba(255, 63, 41, 0.8);
            }
            .name {
                line-height: 24px;
                font-size: 16px;
                color: #333;
            }
        }
        .desc {
            font-size: 12px;
            line-height: 17px;
            color: #666;
            margin-bottom: 4px;
            .teacher {
                padding-bottom: 14px;
                border-bottom: 0.5px solid rgba(153, 153, 153, 0.15);
            }
        }
        .buyer {
            margin-top: 14px;
            height: 35px;
            display: flex;
            font-size: 12px;
            color: #666;
            opacity: 0.8;
            justify-content: space-between;
            align-items: center;
            .right {
                span:first-child {
                    text-decoration: line-through;
                    font-size: 14px;
                    margin-right: 5px;
                }
                span:last-child {
                    display: inline-block;
                    height: 30px;
                    font-size: 22px;
                    line-height: 30px;
                    color: #ff1d00;
                }
            }
        }
    }
}
.course-card:hover {
    top: -5px;
    transition: top 0.2s linear;
    box-shadow: 2px 2px 2px rgba(153, 153, 153, 0.15);
}
</style>
