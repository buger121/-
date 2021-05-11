<template lang="pug">
    div(class="danmu-container")
        div(class="danmu-send")
            el-button(type="info" size="mini" class="send" @click="sendDanMu") 发送弹幕
            el-input(v-model="content" size="mini" type="text" class="danmu-input")
        div(id="danmu")

</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            content: '',
            danmuData: [],
        }
    },
    async created() {},
    async mounted() {
        //初始化
        $('#danmu').danmu({
            height: 510, //弹幕区高度
            width: 950, //弹幕区宽度
            zindex: 100, //弹幕区域z-index属性
            speed: 7000, //滚动弹幕的默认速度，这是数值值得是弹幕滚过每672像素所需要的时间（毫秒）
            sumTime: 65535, //弹幕流的总时间
            danmuLoop: false, //是否循环播放弹幕
            defaultFontColor: '#FFFFFF', //弹幕的默认颜色
            fontSizeSmall: 16, //小弹幕的字号大小
            FontSizeBig: 24, //大弹幕的字号大小
            opacity: '0.9', //默认弹幕透明度
            topBottonDanmuTime: 6000, // 顶部底部弹幕持续时间（毫秒）
            SubtitleProtection: false, //是否字幕保护
            positionOptimize: false, //是否位置优化，位置优化是指像AB站那样弹幕主要漂浮于区域上半部分
            maxCountInScreen: 40, //屏幕上的最大的显示弹幕数目,弹幕数量过多时,优先加载最新的。
            maxCountPerSec: 10, //每分秒钟最多的弹幕数目,弹幕数量过多时,优先加载最新的。
        })
        //获取弹幕
        const lessonId = Number(this.$route.query.lessonId)
        this.danmuData = await this.getDanMuByLessonId(lessonId)

        $('#danmu').danmu('addDanmu', this.danmuData)
        //引用父组件video
        const player = document.getElementsByTagName('video')[0]
        player.addEventListener('play', e => {
            //currentTime表示的是当前进度条时间
            const currentTime = e.target.currentTime
            $('#danmu').danmu('setTime', Math.floor(currentTime * 10))
            $('#danmu').danmu('danmuResume')
        })
        player.addEventListener('pause', () => {
            $('#danmu').danmu('danmuPause')
        })
    },
    methods: {
        ...mapActions(['getDanMuByLessonId', 'addDanMu']),
        async sendDanMu() {
            //发送弹幕
            const text = this.content
            const time = $('#danmu').data('nowTime') + 1
            const color = 'white'
            const position = 0
            const size = 1
            if (text !== '') {
                const myDanMu = {
                    text,
                    time,
                    color,
                    position,
                    size,
                    isNew: 1,
                }
                $('#danmu').danmu('addDanmu', myDanMu)
                const lessonId = Number(this.$route.query.lessonId)
                await this.addDanMu({ ...myDanMu, lessonId })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.danmu-container {
    display: inline-block;
}
.el-input {
    width: 500px;
}
.el-input__inner {
    background-color: #abadb0;
}
</style>
