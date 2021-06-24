import authHttp from "@/api/authHttp";

export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        // 회원가입
        signUp({}, payload) {
            return authHttp.post("accounts/with/profileId", payload);
        },
        login({}, payload) {
            return authHttp.post("accounts/login", payload);
        },
        setProfile({}, payload) {
            return authHttp.post("profiles", payload);
        },
        getMyAccount({}, payload) {
            return authHttp.get("accounts/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
        },
    },
    modules: {}
}
