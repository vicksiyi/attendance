import axios from "./axios";

export const getStudent = function (parms) {
    return axios.request({
        url: `/api/classroom/getStudent?class_id=${parms}`
    })
}


export const addStudent = function (parms) {
    return axios.request({
        url: `/api/classroom/addStudent`,
        method: 'post',
        data: parms
    })
}

export const delStudent = function (id) {
    return axios.request({
        url: `/api/classroom/delStudent/${id}`,
        method: "put"
    })
}

export const addCourse = function (parms) {
    return axios.request({
        url: `/api/classroom/addCourse`,
        method: 'post',
        data: parms
    })
}

export const getCourse = function (id) {
    return axios.request({
        url: `/api/classroom/getCourse?class_id=${id}`
    })
}


export const getStudentCourse = function (student_id, classroom_id) {
    return axios.request({
        url: `/api/classroom/getStudentCourse?student_id=${student_id}&classroom_id=${classroom_id}`
    })
}