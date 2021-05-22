<template lang="pug">
    div(class="forum-container")
        div( v-if="showAll")
            div(class="forum-main")
                div(class="header")
                    div(class="title") 讨论区
                    div(class="desc") 欢迎进入课程讨论区，你可以与本课程的老师和同学在这里交流。如果你有课程相关的问题，请发到老师答疑区；经验、思考、创意、作品、转帖请发到综合讨论区。欢迎分享，鼓励原创，杜绝广告，请大家共同维护一个包容、积极、相互支持的交流氛围，谢谢。
                div(class="item" v-for="item in disscussData")
                    DiscussItem(:item="item" @update-discuss-data="updateDiscussData")
     
            div(class="forum-aside")
                div(class="discussion-btn")
                    
                div(class="choose-area")
                    div(class="teacher-discuss" @click="showTeacherArea")
                        div(class="intro-img")
                        div(class="intro")
                            div 老师答疑区
                            div 你可以将学习过程中关于课程内容、学习方法发布到本区
                    div(class="base-discuss" @click="showStudentArea")
                        div(class="intro-img base")
                        div(class="intro")
                            div 综合讨论区
                            div 欢迎分享，鼓励原创，无论是你的想法、体验还是还是好书好文章都可分享在这里
        
        DiscussArea(v-else-if="showTeacherDiscuss" areaType="teacher" @back-to-all="backToAll" :discussData="teacherDiscussData" @update-discuss-date="updateDiscussData")
        DiscussArea(v-else-if="showStudentsDiscuss" areaType="student" @back-to-all="backToAll" :discussData="studentDiscussData" @update-discuss-date="updateDiscussData")

</template>

<script>
import DiscussArea from './DiscussArea.vue'
import DiscussItem from './DiscussItem.vue'
export default {
    props: {
        disscussData: Array,
    },
    components: { DiscussArea, DiscussItem },
    computed: {
        teacherDiscussData: function() {
            const res = this.disscussData.filter(item => {
                return item.discussArea === 1
            })
            return res
        },
        studentDiscussData: function() {
            const res = this.disscussData.filter(item => {
                return item.discussArea === 2
            })
            return res
        },
    },

    data() {
        return {
            showAll: true,
            showTeacherDiscuss: false,
            showStudentsDiscuss: false,
        }
    },
    methods: {
        showTeacherArea() {
            this.showTeacherDiscuss = true
            this.showAll = false
            this.showStudentsDiscuss = false
        },
        showStudentArea() {
            this.showStudentsDiscuss = true
            this.showAll = false
            this.showTeacherDiscuss = false
        },
        backToAll() {
            this.showAll = true
            this.showTeacherDiscuss = false
            this.showStudentsDiscuss = false
        },
        updateDiscussData() {
            this.$emit('update-discuss-data')
        },
    },
}
</script>

<style lang="scss" scoped>
.forum-container {
    width: 1200px;
    margin: 20px auto;
    .forum-main {
        box-sizing: border-box;
        padding: 14px;
        width: 900px;
        background-color: #fff;
        display: inline-block;
        .header {
            border-bottom: 1px solid #dfdfdf;
            .title {
                font-size: 18px;
                line-height: 20px;
                color: #444;
                margin-bottom: 16px;
            }
            .desc {
                color: #666;
                font-size: 14px;
                padding-bottom: 20px;
            }
        }
    }
    .forum-aside {
        display: inline-block;
        vertical-align: top;
        margin-left: 20px;
        width: 280px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 14px;
        .discussion-btn {
            width: 240px;
            height: 45px;
            background: url('@/assets/img/forum.png');
            background-position: -10px 0;
            cursor: pointer;
        }
        .discussion-btn:hover {
            background-position: -10px -48px;
        }
        .choose-area {
            .teacher-discuss {
                cursor: pointer;
            }
            .base-discuss {
                cursor: pointer;
            }
            .intro-img {
                width: 94px;
                height: 94px;
                background: url('@/assets/img/forum.png');
                background-position: 0 -100px;
                cursor: pointer;
                display: inline-block;
            }
            .intro-img.base {
                background-position: -94px -100px;
            }
            .intro {
                vertical-align: top;
                width: 140px;
                display: inline-block;
                margin-left: 8px;
                div:first-child {
                    font-size: 16px;
                    color: #666;
                    margin: 12px 0 16px 0;
                }
                div:last-child {
                    font-size: 14px;
                    color: #999;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
