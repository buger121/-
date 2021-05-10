<template>
    <div id="app">
        <BaseHeader v-if="navShow" />
        <router-view></router-view>
        <BaseFooter v-if="navShow" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            navShow: true,
        }
    },
    watch: {
        //监听路由变化
        $route(to, from) {
            if (to.name === 'CourseLearn') {
                this.navShow = false
            } else {
                this.navShow = true
            }
        },
    },
}
</script>

<style lang="scss" scoped>
#app {
    background-color: #eee;
}
</style>
