import axios from 'axios'

const baseUrl = "https://api-groupomania.herokuapp.com/api/comment/article/";

export default {

    postComments : (id, comment, headers) => {
    return axios.post(baseUrl + id, {comment}, {headers})
    },
    getComments : (id, headers) => {
        return axios.get(baseUrl + id, {headers})
    },
    updateComments : (id, commentid, comment, headers) => {
        return axios.put(baseUrl + id + '/' + commentid, {comment}, {headers})
    },
    deleteComments : (id, commentid, headers) => {
        return axios.delete(baseUrl + id + '/' + commentid, {headers})
    },

}