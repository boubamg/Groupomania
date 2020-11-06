import axios from 'axios'

const baseUrl = "http://localhost:4000/api/user";

export default {

    signup : (firstname, lastname, email, password) => {
    return axios.post(baseUrl + "/signup", {firstname, lastname, email, password})
    },

    login : (email, password) => {
    return axios.post(baseUrl + "/login", {email, password});
    },

    getProfile : (headers) => {
    return axios.get(baseUrl + "/me", {headers});
    },  

    putProfile : (data, headers) => {
    return axios.put(baseUrl + "/me", data, {headers});
    }, 

    deleteAccount : (headers) => {
    return axios.delete(baseUrl + "/me", {headers});
    }

}