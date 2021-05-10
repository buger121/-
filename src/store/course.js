import axios from './../utils/http'

const course = {
    state: {
        courseInfo: {},
    },
    mutations: {
        SET_COURSE_INFO(state, data) {
            state.courseInfo = data
        },
    },
    actions: {
        async getCourseDetail({ commit }, course_id) {
            try {
                const { data } = await axios.get(`/course/detail/${course_id}`)
                return data
            } catch (err) {
                console.log(err)
            }
        },

        async signUpCourse({ commit }, courseId) {
            const param = {
                courseId,
            }
            try {
                const { data } = await axios.post('/course/signUpCourse', param)
                return data
            } catch (err) {
                console.log(err)
            }
        },

        async getCourseMainInfo({ commit }, courseId) {
            const query = {
                courseId,
            }
            try {
                const { data } = await axios.get('/course/courseMainInfo', {
                    params: query,
                })
                return data
            } catch (err) {
                console.log(err)
            }
        },

        async releaseComment({ commit }, commentData) {
            try {
                const { data } = await axios.post(
                    '/course/releaseComment',
                    commentData
                )
                return data
            } catch (err) {
                console.log(err)
            }
        },

        async getCourseNotesData({ commit }, courseId) {
            const query = {
                courseId,
            }
            try {
                const { data } = await axios.get('/course/notesData', {
                    params: query,
                })
                return data
            } catch (err) {
                console.log(err)
            }
        },

        async getNoteComment({ commit }, noteId) {
            const query = {
                noteId,
            }
            try {
                const { data } = await axios.get('/course/noteComment', {
                    params: query,
                })
                return data
            } catch (err) {
                console.log(err)
            }
        },

        async getTestData({ commit }, lessonId) {
            const query = {
                lessonId,
            }
            try {
                const { data } = await axios.get('/course/testData', {
                    params: query,
                })
                return data
            } catch (err) {
                console.log(err)
            }
        },

        async checkTestData({ commit }, anwser) {
            try {
                const { data } = await axios.post(
                    '/course/checkTestData',
                    anwser
                )
                return data
            } catch (err) {
                console.log(err)
            }
        },
    },
}

export default course
