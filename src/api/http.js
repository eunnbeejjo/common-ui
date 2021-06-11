import axios from "axios";
import {eventBus} from "@/utils/eventbus";

const instance = axios.create({
    baseURL: process.env.VUE_APP_URI,
    headers: {
        "Accept" : "*/*",
        "Content-Type" : "application/json",
    },
});

instance.interceptors.response.use(undefined, error => {

    if(error.response) {
        console.log(error.response)
        let data = error.response.data;
        let value = {type: "error", message: `[${data.status}] ${data.message}`}
        eventBus.$emit("alert", value);
    }

    return Promise.reject(error)
});

export default instance;