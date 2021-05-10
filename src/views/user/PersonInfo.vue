<template lang="pug">
    div(class="person-info-wrapper")
        Tabs
            Tab(title="资料设置")
                InfoEdit 
            Tab(title="账号设置")
                div
</template>

<script>
import Tabs from '@/components/common/tabs.vue'
import Tab from '@/components/common/tab.vue'
import InfoEdit from './components/InfoEdit.vue'
export default {
    components: { Tabs, Tab, InfoEdit },
    data() {
        return {}
    },
}
</script>

<style lang="scss" scoped>
.person-info-wrapper {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    ::v-deep.tabs__header {
        background: #fafafa;
        font-size: 16px;
        li {
            line-height: 40px;
        }
    }
}
</style>
