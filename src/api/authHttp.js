import axios from "axios";
import {eventBus} from "@/utils/eventbus";

const instance = axios.create({
    baseURL: 'https://account.dkargo.io:17302/api/',
    headers: {
        "Accept" : "*/*",
        // "Content-Type" : "application/json",
        // 콘텐트타입 옵셔널하게 -> 특정 api 호출 할때 타입 다르게 지정
        // "Content-Type" : "multipart/form-data",
    },
});/*

instance.interceptors.response.use(undefined, error => {

    if(error.response) {
        console.log(error.response)
        let data = error.response.data;
        let value = {type: "error", message: `[${data.status}] ${data.message}`}
        eventBus.$emit("alert", value);
    }

    return Promise.reject(error)
});*/

export default instance;