<template lang="pug">
    div(class="rec-container" @click="openDialog")
        div(class="rec-dialog" v-show="showDialog")
            div(class="title")
                span(class="main") 请选择你的学习兴趣
                span(class="sub") 至少选择1个，可随时调整
                <i class="el-icon-close" @click.stop="closeDialog"></i>
            div(class="tab")
                div(class="tab-head" @click="chooseTab")
                    span(v-for="(item, index) in tabHeads" :key="index" :data-index="index" ref="tabItem") {{item}}
                div(class="tab-main") 
                    span(class="tag-163 tag" :class="setChosen(tag)" v-for="tag in chosenContent" :key="tag" @click="toggleChosen($event, tag)") {{tag}}
            div(class="tag-chosen") 
                span 已选{{chosenInterests.length}}个：
                span(class="tag-163" v-for="chosenTag in chosenInterests" :key="chosenTag")
                    span {{chosenTag}}
                    i(class="el-icon-close" @click="cancelTag(chosenTag)")
            div(class="chooseBtn")
                span 选好了

</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    props: {
        showDialog: Boolean,
    },
    data() {
        return {
            interests: [
                { 职场提升: ['办公软件', '效率工具'] },
                { 编程与开发: ['编程语言', '前端开发', '后端开发'] },
                { AI数据科学: ['编程语言', '前端开发', '后端开发'] },
                { 生活爱好: ['编程语言', '前端开发', '后端开发'] },
                { 设计创意: ['编程语言', '前端开发', '后端开发'] },
                { 产品与运营: ['编程语言', '前端开发', '后端开发'] },
                { 电商运营: ['编程语言', '前端开发', '后端开发'] },
                { 职业考试: ['编程语言', '前端开发', '后端开发'] },
                { 语言学习: ['编程语言', '前端开发', '后端开发'] },
            ],
            chosenTab: 0,
        }
    },
    computed: {
        ...mapState({ chosenInterests: state => state.home.chosenInterests }),
        tabHeads: function() {
            let res = []
            for (let index in this.interests) {
                res = res.concat(Object.keys(this.interests[index]))
            }
            return res
        },
        chosenContent: function() {
            const obj = this.interests[this.chosenTab]
            for (let key of Object.keys(obj)) {
                return obj[key]
            }
        },
        chosenStatus: function() {},
    },
    mounted() {
        //初次打开时，默认选中第0项
        this.$refs.tabItem[0].className = 'active'
    },
    methods: {
        ...mapMutations(['SET_INTEREST']),
        closeDialog() {
            this.$emit('close-dialog')
        },
        openDialog() {
            this.$emit('open-dialog')
        },
        chooseTab(e) {
            this.chosenTab = e.target.getAttribute('data-index')
            for (let i in this.$refs.tabItem) {
                if (this.chosenTab === i) {
                    this.$refs.tabItem[i].className = 'active'
                } else {
                    this.$refs.tabItem[i].className = ''
                }
            }
        },
        toggleChosen(e, tag) {
            let tmp = this.chosenInterests
            let classNames = e.target.classList
            if (tmp.indexOf(tag) === -1) {
                //不存在，添加该兴趣
                tmp.push(tag)
                classNames.add('chosen')
            } else {
                //已存在，删除该兴趣
                tmp.splice(tmp.indexOf(tag), 1)
                classNames.remove('chosen')
            }
            this.SET_INTEREST(tmp)
        },
        setChosen(tag) {
            if (this.chosenInterests.indexOf(tag) !== -1) {
                //已被选中的兴趣，修改为选中状态样式
                return 'chosen'
            }
        },
        cancelTag(tag) {
            const tmp = this.chosenInterests
            tmp.splice(tmp.indexOf(tag), 1)
            this.SET_INTEREST(tmp)
        },
    },
}
</script>
<style lang="scss" scoped>
.rec-container {
    width: 90%;
    margin: 0 auto;
    height: 110px;
    background-image: url('@/assets/img/rec.jpg');
    cursor: pointer;
}
.rec-dialog {
    cursor: default;
    width: 800px;
    height: 400px;
    background-color: #fff;
    z-index: 20;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
        .main {
            font-size: 18px;
            font-weight: 400;
            margin-right: 40px;
        }
        .sub {
            font-size: 14px;
            color: #666;
        }
        .el-icon-close {
            font-size: 18px;
            float: right;
            cursor: pointer;
            transition: all 0.4s ease;
        }
        .el-icon-close:hover {
            color: $main-color;
            transform: rotate(90deg);
            transition: all 0.4s ease;
        }
    }
    .tab-head {
        display: flex;
        justify-content: space-between;
        color: #666;
        font-weight: 200;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin-bottom: 20px;
        span {
            cursor: pointer;
            padding-bottom: 6px;
        }
        .active {
            border-bottom: 2px solid $main-color;
        }
    }
    .tab-main {
        height: 160px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        .tag {
            cursor: pointer;
        }
    }
    .tag-chosen {
        font-size: 14px;
        color: #666;
        .tag-163 span {
            margin-right: 5px;
        }
        .tag-163 i {
            cursor: pointer;
        }
        .tag-163 i:hover {
            transform: rotate(90);
            animation: all 0.2s ease;
        }
    }
    .chooseBtn {
        margin: 25px auto 0;
        width: 180px;
        height: 44px;
        line-height: 44px;
        border-radius: 22px;
        text-align: center;
        background-color: #ff3f29;
        color: #fff;
        cursor: pointer;
    }
}
</style>
