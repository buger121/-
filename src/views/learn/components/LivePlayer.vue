<template lang="pug">
    div(class="video-container" :class="{fold: toggleVideo===true}")
        video(id="videoElement" controls autoplay width="1000" height="500"
            @play="playHandle" 
            @canplay="canPlayHandle"
            @ended="endedHandle"
            @removetrack="removeTrackHandle"
            )
        el-button(size="mini" @click="play" class="play-btn") 播放
        div(class="danmu-send")
                el-button(type="info" size="mini" class="send" @click="sendDanMu") 发送弹幕
                el-input(v-model="content" size="mini" type="text" class="danmu-input")
        div(class="danmu-container")
            div(id="danmu-live")
            

</template>

<script>
import flvjs from 'flv.js'
export default {
    props: {
        toggleVideo: Boolean,
    },
    data() {
        return {
            flvPlayer: null,
            content: '',
        }
    },
    methods: {
        sendDanMu() {
            const text = this.content
            const time = $('#danmu-live').data('nowTime') + 1
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
                $('#danmu-live').danmu('addDanmu', myDanMu)
                this.content = ''
            }
        },
        play() {
            this.flvPlayer.play()
        },
        playHandle(e) {
            console.log('play')
            const currentTime = e.target.currentTime
            console.log(currentTime)
            $('#danmu-live').danmu('setTime', Math.floor(currentTime * 10))
            $('#danmu-live').danmu('danmuResume')
        },
        canPlayHandle() {
            //推流开始，可以获取流
            console.log('can play')
        },
        endedHandle() {
            //推流结束
            console.log('end')
        },
        removeTrackHandle() {
            console.log('remove track')
        },
    },
    mounted() {
        const videoElement = document.getElementById('videoElement')
        this.flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            url: 'http://localhost:8000/live/STREAM_NAME.flv',
        })
        this.flvPlayer.attachMediaElement(videoElement)
        this.flvPlayer.load()
        this.flvPlayer.play()

        //弹幕初始化
        $('#danmu-live').danmu({
            height: 450, //弹幕区高度
            width: 1000, //弹幕区宽度
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
        $('#danmu-live').danmu('addDanmu', [
            {
                text: '这是滚动弹幕',
                color: 'white',
                size: 1,
                position: 0,
                time: 20,
            },
            {
                text: '这是顶部弹幕',
                color: 'yellow',
                size: 1,
                position: 1,
                time: 30,
            },
            {
                text: '这是底部弹幕',
                color: 'red',
                size: 1,
                position: 2,
                time: 40,
            },
        ])
        // $('#danmu-live').danmu('danmuStart')
    },
}
</script>

<style lang="scss" scoped>
.video-container {
    width: 1000px;
    height: 500px;
    margin: 60px auto;
}
.danmu-container {
    position: absolute;
    top: 60px;
    left: 180px;
}
.danmu-send {
    display: inline-block;
    .el-input {
        width: 200px;
    }
    .el-button {
        margin-left: 20px;
    }
}
</style>
