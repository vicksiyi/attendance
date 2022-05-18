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