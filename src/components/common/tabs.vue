<template lang="pug">
    div
        ul(class="tabs__header")
            li(v-for="(tab, index) in tabs" :key="tab.title" @click="selectTab(index)" :class="{'tabs__selected': (index === selectedIndex)}") {{tab.title}}
        slot
</template>

<script>
export default {
    data() {
        return {
            selectedIndex: 0,
            tabs: [],
        }
    },
    created() {
        this.tabs = this.$children
    },
    mounted() {
        this.selectTab(0)
    },
    methods: {
        selectTab(i) {
            this.selectedIndex = i
            this.tabs.forEach((tab, index) => {
                tab.isActive = index === i
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.tabs__header {
    font-size: 20px;
    text-align: center;
    width: fit-content;
    li {
        display: inline-block;
        line-height: 52px;
        width: 180px;
        color: #848a90;
        border-bottom: 2px solid #ddd;
        cursor: pointer;
    }
    .tabs__selected {
        border-bottom: 2px solid $main-color;
        color: #36404a;
        font-weight: 600;
    }
}
</style>
