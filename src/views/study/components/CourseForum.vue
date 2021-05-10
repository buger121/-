<template lang="pug">
    div(class="forum-container")
        div(class="forum-main")
            div(class="header")
                div(class="title") 讨论区
                div(class="desc") 欢迎进入课程讨论区，你可以与本课程的老师和同学在这里交流。如果你有课程相关的问题，请发到老师答疑区；经验、思考、创意、作品、转帖请发到综合讨论区。欢迎分享，鼓励原创，杜绝广告，请大家共同维护一个包容、积极、相互支持的交流氛围，谢谢。
            div(class="item")
                div(class="item-header")
                    img
                    span(class="username") Rayykt145
                    span(class="time") 2020-4-15
                    span(class="origin") 【综合讨论区】
                div(class="item-content") 期待更新
                div(class="item-footer")
                    span(class="view")
                        i(class="el-icon-view")
                        span (46)
                    span(class="comment")
                        i(class="el-icon-chat-dot-round")
                        span (0)
                    span(class="like")
                        i(class="el-icon-s-opportunity")
                        span (0)
        div(class="forum-aside")
            div(class="discussion-btn")
                
            div(class="choose-area")
                div(class="teacher-discuss")
                    div(class="intro-img")
                    div(class="intro")
                        div 老师答疑区
                        div 你可以将学习过程中关于课程内容、学习方法发布到本区
                div(class="base-discuss")
                    div(class="intro-img base")
                    div(class="intro")
                        div 综合讨论区
                        div 欢迎分享，鼓励原创，无论是你的想法、体验还是还是好书好文章都可分享在这里

</template>

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
        .item {
            padding: 16px 0;
            border-bottom: 1px solid #dfdfdf;
            font-size: 12px;
            color: #666;
            .item-header {
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 18px;
                }
                span {
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
                    top: 12px;
                }
                .username {
                    color: $main-color;
                    margin-right: 28px;
                }
                .origin {
                    float: right;
                }
            }
            .item-content {
                font-size: 14px;
                color: #666;
                margin: 16px 0;
            }
            .item-footer {
                overflow: hidden;
                & > span {
                    cursor: pointer;
                    float: right;
                    margin-left: 12px;
                    i {
                        margin-right: 4px;
                    }
                }
                & > span:hover {
                    color: $main-color;
                }
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
