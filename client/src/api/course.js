import axios from "./axios";

export const getCourse = function (id) {
    return axios.request({
        url: `/api/course/getCourse?classroom_id=${id}`
    })
}

export const deleteCourse = function (id) {
    return axios.request({
        url: `/api/course/deleteCourse?classrooms_data_id=${id}`,
        method: "delete"
    })
}


export const getCourseDetail = function (id) {
    return axios.request({
        url: `/api/course/getCourseDetail?classrooms_data_id=${id}`
    })
}

export const getStudentCourse = function (student_id, classroom_id) {
    return axios.request({
        url: `/api/course/getStudentCourse?student_id=${student_id}&classroom_id=${classroom_id}`
    })
}


export const getCourseScale = function (classroom_id) {
    return axios.request({
        url: `/api/course/getCourseScale?classroom_id=${classroom_id}`
    })
}
