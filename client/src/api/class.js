import axios from "./axios";

export const add = function (parms) {
    return axios.request({
        url: '/api/class/add',
        method: 'post',
        data: parms
    })
}

export const get = function (parms) {
    return axios.request({
        url: '/api/class/get'
    })
}