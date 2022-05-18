import axios from "./axios";

export const getCourse = function (id) {
    return axios.request({
        url: `/api/course/getCourse?classroom_id=${id}`
    })
}
