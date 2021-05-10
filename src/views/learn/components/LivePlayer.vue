<template lang="pug">
    div(class="video-container" :class="{fold: toggleVideo===true}")
            video(id="videoElement" controls autoplay width="1000" height="500"
             @play="playHandle" 
             @canplay="canPlayHandle"
             @ended="endedHandle"
             @removetrack="removeTrackHandle"
             )
            el-button(size="mini" @click="play") 播放
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
        }
    },
    methods: {
        play() {
            this.flvPlayer.play()
        },
        playHandle() {
            console.log('play')
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
    },
}
</script>

<style lang="scss" scoped>
.video-container {
    width: 1000px;
    height: 500px;
    margin: 60px auto;
}
</style>
