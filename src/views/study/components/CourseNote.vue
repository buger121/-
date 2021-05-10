<template lang="pug">
    div(class="course-note-container")
        div(class="main")
            div(class="header")
                span 笔记 
                span 最新笔记
                span 最优笔记
            div( class="choose-course" @click="chooseCourse")
                span(data-index="-1") 全部笔记
                span(data-index="0") 课程笔记
                span(data-index="1" v-for="index in courseInfo.courseLength") 课时{{index}}
            div(class="notes")
                div(class="item" v-for="note in notesData")
                    img(:Src="note.avatar")
                    div(class="main-info")
                        div(class="item-header")
                            span(class="username") {{note.username}}
                            span(class="course") 课时{{note.lessonIndex}}
                        div(class="content") {{note.content}}
                        div(class="item-footer")
                            span(class="time") {{note.time | dateFormate}}
                            span(class="tool")
                                span(class="like"  :class="{liked: getlikeStatus(note.noteId)}" @click="toggleLike(note.noteId)")
                                    i(class="el-icon-s-opportunity")
                                    span 顶（{{note.likeNum}}）
                                span(class="comment" @click="toggleComment(note.noteId)" )
                                    i(class="el-icon-s-comment")
                                    span 评论（{{note.commentNum}}）
                                span(class="collect")
                                    i(class="el-icon-star-off")
                                    span 收藏
                                span(class="share")
                                    i(class="el-icon-share")
                                    span 分享
                        div(class="comment-box" v-show="getShowStatus(note.noteId)" )
                            div(v-for="comment in getComment(note.noteId)" class="comment-item")
                                i(class="el-icon-arrow-up")
                                img(:src="comment.avatar")
                                div(class="box-info")
                                    div(class="box-header")
                                        span {{comment.username}}
                                        span {{comment.time | dateFormate}}
                                    div(class="box-main") {{comment.content}}
                            div(class="my-comment")
                                el-input(type="textarea" :rows="2" v-model="myNoteComment" placeholder="请添加你的评论...")
                                el-button(type="danger" size="mini" @click="releaseNoteComment(note.noteId)") 评论
        div(class="aside-btn")
            i(class="el-icon-edit")
            span 添加笔记
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
    props: {
        courseInfo: Object,
        notesData: Array,
    },
    data() {
        return {
            activeCourse: -1,
            noteStatus: [],
            myNoteComment: '',
        }
    },
    watch: {
        notesData: function(newVal, oldVal) {
            //1.初始化状态数组
            for (let item of newVal) {
                const obj = {}
                obj.noteId = item.noteId
                obj.liked = item.liked
                obj.showComment = false
                this.noteStatus.push(obj)
            }
        },
    },
    methods: {
        ...mapActions(['getNoteComment']),
        chooseCourse(e) {
            const index = Number(e.target.getAttribute('data-index'))
            this.activeCourse = index
            const parentNode = document.querySelector('.choose-course')
            const children = parentNode.children
            //清除原来的active
            for (let i = 0; i < children.length; i++) {
                children[i].classList.remove('active')
            }
            //为当前选择元素设为active
            e.target.classList.add('active')
        },
        toggleLike(noteId) {
            for (let item of this.likeArray) {
                if (item.noteId === noteId) {
                    item.liked = !item.liked
                }
            }
            this.getlikeStatus(noteId)
        },
        getlikeStatus(noteId) {
            for (let item of this.noteStatus) {
                if (item.noteId === noteId) {
                    return item.liked
                }
            }
            return false
        },
        getShowStatus(noteId) {
            for (let item of this.noteStatus) {
                if (item.noteId === noteId) {
                    return item.showComment
                }
            }
        },
        getComment(noteId) {
            for (let item of this.noteStatus) {
                if (item.noteId === noteId) {
                    return item.comments
                }
            }
        },
        async toggleComment(noteId) {
            for (let obj of this.noteStatus) {
                if (obj.noteId === noteId) {
                    //查找对应的笔记
                    if (!obj.comments) {
                        const comments = await this.getNoteComment(noteId)
                        obj.comments = comments
                    }
                    obj.showComment = !obj.showComment
                }
            }
            this.getComment(noteId)
            this.getShowStatus(noteId)
        },
        async releaseNoteComment(noteId) {
            //TODO
        },
    },
    filters: {
        dateFormate: function(date) {
            return moment(date).format('YYYY-MM-DD')
        },
    },
}
</script>

<style lang="scss" scoped>
.course-note-container {
    width: 1200px;
    margin: 14px auto;
    .main {
        display: inline-block;
        width: 900px;
        padding: 14px;
        box-sizing: border-box;
        background-color: #fff;
        .header {
            border-bottom: 1px solid #aaa;
            padding-bottom: 12px;
            span:nth-child(1) {
                font-size: 18px;
                color: #333;
            }
            span:nth-child(2) {
                cursor: pointer;
                float: right;
                font-size: 14px;
                margin-left: 8px;
                position: relative;
                top: 4px;
            }
            span:nth-child(3) {
                cursor: pointer;
                font-size: 14px;
                color: $main-color;
                float: right;
                position: relative;
                top: 4px;
            }
        }
        .choose-course {
            padding-top: 14px;
            padding-bottom: 20px;
            border-bottom: 1px solid #dfdfdf;
            span {
                cursor: pointer;
                display: inline-block;
                border: 1px solid #ececec;
                background-color: #f5f5f5;
                padding: 0 6px;
                margin-right: 7px;
                color: #666;
                font-size: 12px;
                line-height: 21px;
            }
            span:hover {
                color: $main-color;
            }
            .active {
                color: #fff;
                background-color: $main-color;
            }
            .active:hover {
                color: #fff;
            }
        }
    }
    .item {
        margin-top: 14px;
        font-size: 12px;
        color: #97958c;

        img {
            width: 40px;
            height: 40px;
        }
        .main-info {
            display: inline-block;
            vertical-align: top;
            width: 810px;
            margin-left: 20px;
            .item-header {
                line-height: 26px;
                .username {
                    color: #ff3f29;
                    font-size: 14px;
                }
                .course {
                    float: right;
                }
            }
            .content {
                color: #666;
                margin-top: 4px;
            }
            .item-footer {
                margin-top: 10px;
                .tool {
                    float: right;
                    .liked.like {
                        color: $main-color;
                    }
                    .like {
                        color: #666;
                    }
                }
                .tool > span {
                    cursor: pointer;
                    margin-left: 12px;
                    i {
                        margin-right: 2px;
                    }
                }
                .tool > span:hover {
                    color: $main-color;
                }
            }
            .comment-box {
                position: relative;
                border: 1px solid #eee;
                margin-top: 18px;
                padding: 10px 6px 16px 6px;
                .comment-item {
                    margin-top: 10px;
                }
                i {
                    font-size: 12px;
                    color: #eee;
                    position: absolute;
                    right: 130px;
                    top: -9px;
                }
                .box-info {
                    display: inline-block;
                    vertical-align: top;
                    margin-left: 12px;
                    font-size: 10px;
                    .box-header {
                        span:first-child {
                            color: $main-color;
                            margin-right: 8px;
                        }
                    }
                    .box-main {
                        color: #666;
                    }
                }
                .my-comment {
                    margin-top: 14px;
                    .el-button {
                        margin-top: 8px;
                    }
                }
            }
        }
    }
    .aside-btn {
        display: inline-block;
        vertical-align: top;
        margin-left: 20px;
        background-color: $main-color;
        width: 280px;
        line-height: 50px;
        text-align: center;
        flex-wrap: nowrap;
        color: #fff;
        box-sizing: border-box;
        cursor: pointer;
        box-shadow: 2px 2px 2px #aeaeae;
        i {
            margin-right: 6px;
        }
    }
}
</style>
