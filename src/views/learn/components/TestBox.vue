<template lang="pug">
    div(class="test-box-container")
        div(class="header")
            span 课程习题
            i(class="el-icon-right" @click="nextIndex")

            span(class="dots" @click="changeIndex")
                span(v-for="(question, index) in questions" class="dot" :class="{active: currentIndex === index}" :data-index="index") 
        div(class="main")
            div(class="topic")
                span(class="index") 题目{{currentIndex + 1}}：
                span(class="desc") {{questions[currentIndex].desc}}
                span(class="type") （{{questions[currentIndex].type === 'multiple' ? '多选' : '单选'}}）
            div(class="content")
                el-checkbox-group(v-model="answers[currentIndex]" :max="questions[currentIndex].type === 'multiple' ? 4 : 1" )
                    el-checkbox(v-for="item in questions[currentIndex].options" :label="item.value" :key="item.value") {{item.label}}
                        i(class="el-icon-circle-check success" v-show="showSuccessCheckIcon(item.value)")
                        i(class="el-icon-circle-close fail" v-show="showFailCheckIcon(item.value)")
                        i(class="el-icon-remove-outline fail" v-show="showMissCheckIcon(item.value)")
            div(class="score" v-show="questions[currentIndex].rightAnswer")
                span 正确答案：{{questions[currentIndex].rightAnswer}}
        div(class="footer")
            el-button(type="danger" @click="submitTest") 提交
        

</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        testData: Array,
    },
    data() {
        return {
            questions: [{ desc: '' }], //避免初始化报错
            answers: [],
            currentIndex: 0,
        }
    },
    watch: {
        testData: function(newVal) {
            this.questions = newVal
            //根据questions长度初始化answers
            for (let i = 0; i < this.questions.length; i++) {
                this.answers.push([])
            }
        },
    },
    methods: {
        ...mapActions(['checkTestData']),
        async submitTest() {
            const lessonId = Number(this.$route.query.lessonId)
            const res = await this.checkTestData({
                answers: this.answers,
                lessonId,
            })
            this.questions = res
        },
        changeIndex(e) {
            this.currentIndex = Number(e.target.getAttribute('data-index'))
        },
        nextIndex() {
            this.currentIndex = (this.currentIndex + 1) % this.questions.length
        },
        showSuccessCheckIcon(value) {
            const myAnswer = this.questions[this.currentIndex].myAnswer
            const rightAnswer = this.questions[this.currentIndex].rightAnswer
            if (myAnswer) {
                //提交答案后
                if (
                    myAnswer.indexOf(value) !== -1 &&
                    rightAnswer.indexOf(value) !== -1
                ) {
                    return true
                }
            } else {
                return false
            }
        },
        showFailCheckIcon(value) {
            const myAnswer = this.questions[this.currentIndex].myAnswer
            const rightAnswer = this.questions[this.currentIndex].rightAnswer
            if (myAnswer) {
                //1.错选
                if (
                    myAnswer.indexOf(value) !== -1 &&
                    rightAnswer.indexOf(value) === -1
                ) {
                    return true
                }
            }
            return false
        },
        showMissCheckIcon(value) {
            const myAnswer = this.questions[this.currentIndex].myAnswer
            const rightAnswer = this.questions[this.currentIndex].rightAnswer
            if (myAnswer) {
                //2.漏选
                if (
                    myAnswer.indexOf(value) === -1 &&
                    rightAnswer.indexOf(value) !== -1
                ) {
                    return true
                }
            }
            return false
        },
    },
}
</script>

<style lang="scss" scoped>
.test-box-container {
    width: 950px;
    position: relative;
    top: 60px;
    left: 60px;
    height: 450px;
    transition: width 0.4s linear;
    background-color: #fff;

    .header {
        line-height: 44px;
        background-color: #efefef;
        position: relative;
        span:first-child {
            margin-left: 20px;
            font-weight: 600;
        }
        .dots {
            float: right;
            margin-right: 10px;
        }
        i {
            float: right;
            cursor: pointer;
            margin-top: 14px;
            margin-right: 14px;
        }
        .dot {
            cursor: pointer;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #fff;
            border: 1px solid #eee;
            margin-right: 6px;
        }
        .dot.active {
            width: 8px;
            height: 8px;
            background-color: $main-color;
        }
    }
    .main {
        padding: 16px;
        font-size: 14px;
        color: #666;
        .topic {
            margin-bottom: 12px;
            .index {
                font-weight: 600;
            }
        }
        .el-checkbox {
            display: block;
            padding: 12px 6px;
            border: 1px solid #fff;
            position: relative;
            margin-right: 30px;
            i {
                position: absolute;
                font-size: 19px;
            }
            i.success {
                color: lightgreen;
                right: 20px;
            }
            i.fail {
                color: $main-color;
                right: 20px;
            }
        }
        .el-checkbox:hover {
            cursor: pointer;
            border: 1px solid lightcoral;
            border-radius: 4px;
        }
        .score {
            position: absolute;
            left: 40px;
            top: 280px;
        }
    }
    .footer {
        position: absolute;
        right: 40px;
        top: 280px;
    }
}
.test-box-container.fold {
    width: 1200px;
    transition: width 0.4s linear;
}
</style>
