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