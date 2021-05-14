<template lang="pug">
    div(class="danmu-container")
        div(class="danmu-send")
            el-switch(v-model="openDanMu" active-color="#999" inactive-color="#ff4949" @change="switchOpenDanMu")
            el-input(v-model="content" size="mini" type="text" class="danmu-input")
                i(slot="prefix" class="el-input__icon el-icon-s-tools" @click="toggleSettingBox")
            el-button(type="info" size="mini" class="send" @click="sendDanMu") 发送弹幕
            div(class="setting-box" v-show="showSettingBox")
                div(class="radio")
                    div(class="radio-title") 颜色
                    el-radio-group(v-model="color")
                        el-radio(label="white")
                            span(class="color-box white")
                        el-radio(label="red")
                            span(class="color-box red")
                        el-radio(label="yellow")
                            span(class="color-box yellow")
                div(class="radio")
                    div(class="radio-title") 位置
                    el-radio-group(v-model="position")
                        el-radio(:label="0")
                            span 滚动弹幕
                        el-radio(:label="1")
                            span 顶部弹幕
                        el-radio(:label="2")
                            span 底部弹幕
                div(class="radio")
                    div(class="radio-title") 大小
                    el-radio-group(v-model="size")
                        el-radio(:label="1")
                            span 小
                        el-radio(:label="2")
                            span 中
                        el-radio(:label="3")
                            span 大
        div(id="danmu")

</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            content: '',
            danmuData: [],
            openDanMu: true,
            color: 'white',
            position: 0,
            size: 1,
            showSettingBox: false,
        }
    },
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
            const color = this.color
            const position = this.position
            const size = this.size
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
                //发送后清空输入框,关闭setting box
                this.content = ''
                this.showSettingBox = false
            }
        },
        switchOpenDanMu() {
            if (this.openDanMu) {
                //开启弹幕
                $('#danmu').danmu('danmuResume')
                $('#danmu').danmu('setOpacity', 1)
            } else {
                $('#danmu').danmu('danmuStop')
                $('#danmu').danmu('setOpacity', 0)
            }
        },
        toggleSettingBox() {
            this.showSettingBox = !this.showSettingBox
        },
    },
}
</script>

<style lang="scss" scoped>
.danmu-container {
    display: inline-block;
}
.danmu-send {
    position: relative;
    .el-switch {
        margin-right: 10px;
    }
    .el-input {
        width: 500px;
        i {
            font-size: 14px;
            color: #999;
            cursor: pointer;
        }
    }
    .el-input__inner {
        background-color: #abadb0;
    }
    .setting-box {
        padding: 6px;
        position: absolute;
        left: 50px;
        top: -160px;
        z-index: 9999;
        background-color: rgba(255, 255, 255, 0.4);
        color: #fff;
        border-radius: 4px;
        .color-box {
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
        }
        .radio {
            margin-top: 8px;
        }
        .radio-title {
            font-size: 14px;
        }
        .el-radio {
            color: #f2f6fc;
        }
        .color-box.red {
            background-color: #fe0302;
        }
        .color-box.white {
            background-color: #fff;
        }
        .color-box.yellow {
            background-color: #ffff00;
        }
    }
}
</style>
