import http from "@/api/http";

export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        getBoardList({}, payload) {
            return http.get("boards/" + payload.userId);
        },
        getCategoryList({}, payload) {
            return http.get("categories", {params: payload});
        },
        getSearchBoardList({}, payload) {
            return http.get("boards/search/" + payload.userId, {params: payload});
        },
        getBoardOwnerConfirm({}, payload) {
            return http.get("", {params: payload});
        },
        getBoardStatus({}, payload) {
            return http.get("boards/status", {params: payload});
        },
        getBoardDetail({}, payload) {
            return http.get("boards/detail", {params: payload});
        },
        getAttachments({}, payload) {
            return http.get("", {params: payload});
        },
        getComments({}, payload) {
            return http.get("", {params: payload});
        },
        getBoardPasswordConfirm({}, payload) {
            return http.post("", payload);
        },
        createBoard({}, payload) {
            return http.post("boards", payload);
        },
        createComment({}, payload) {
            return http.post("", payload);
        },
        updateBoard({}, payload) {
            return http.patch("", payload);
        },
        updateComment({}, payload) {
            return http.patch("", payload);
        },
        removeBoard({}, payload) {
            return http.delete("", payload);
        },
        removeComment({}, payload) {
            return http.delete("", payload);
        },
    },
    modules: {},
}