import { axios } from "../../core";

export default {
    login: (data) => axios.post("/user/login", data),
    registration: (data) => axios.post("/user/registration", data),
}