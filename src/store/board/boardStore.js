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
        uploadMultipleFiles({}, payload) {
            return http.post("attachments/multiple", payload.formData, {params: payload.params})
        },
        getCommentList({}, payload) {
            return http.get("comments/" + payload.boardId, {params: payload});
        },
        getBoardPasswordConfirm({}, payload) {
            return http.post("boards/password", payload);
        },
        createBoard({}, payload) {
            return http.post("boards", payload);
        },
        updateBoard({}, payload) {
            return http.put("boards/detail", payload);
        },
        deleteBoard({}, payload) {
            return http.delete("boards/detail", payload);
        },
        createComment({}, payload) {
            return http.post("comments", payload);
        },
        updateComment({}, payload) {
            return http.put("comments", payload);
        },
        deleteComment({}, payload) {
            return http.delete("comments", payload);
        },
        createReply({}, payload) {
            return http.post("comments/reply", payload);
        },
    },
    modules: {},
}