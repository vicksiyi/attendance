import axios from "./axios";

export const register = function (parms) {
    return axios.request({
        url: '/api/user/register',
        method: 'post',
        data: parms
    })
}

export const login = function (parms) {
    return axios.request({
        url: '/api/user/login',
        method: 'post',
        data: parms
    })
}