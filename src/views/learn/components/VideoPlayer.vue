<template lang="pug">
    div(class="video-container" :class="{fold: toggleVideo===true}")
            video(ref="videoPlayer" class="video-js vjs-my-style")
            DanMu
</template>

<script>
import videojs from 'video.js'
import DanMu from './DanMu.vue'
export default {
    components: { DanMu },
    props: {
        toggleVideo: Boolean,
        videoSrc: String,
    },
    data() {
        return {
            player: null,
            options: {
                autoplay: false,
                controls: true,
                fluid: false,
                fill: true,
                //动态配置src，故不在options中预设
            },
        }
    },
    mounted() {
        // console.log(this.videoSrc)
        this.player = videojs(
            this.$refs.videoPlayer,
            this.options,
            function onPlayerReady() {
                console.log('onPlayerReady', this)
            }
        )
    },
    watch: {
        //由于videosSrc是基于异步操作获取的，因此需要通过监视器的方式获取异步响应后的值
        videoSrc: {
            handler: function(newVal, oldVal) {
                this.player.src({ type: 'video/mp4', src: this.videoSrc })
            },
        },
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    },
}
</script>

<style lang="scss" scoped>
.video-container {
    width: 950px;
    position: relative;
    top: 60px;
    left: 60px;
    height: 550px;
    transition: width 0.4s linear;
}
.video-container.fold {
    width: 1200px;
    transition: width 0.4s linear;
}
::v-deep.video-js .vjs-big-play-button {
    z-index: 9999;
}
</style>
