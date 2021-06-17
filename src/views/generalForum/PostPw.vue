<template>
  <v-container>
    비밀번호를 입력하시오
    <v-text-field placeholder="비밀번호" v-model="password" type="password"></v-text-field>
    <v-btn @click="$router.push('/general-forum')">취소</v-btn>
    <v-btn @click="getBoardPasswordConfirm">확인</v-btn>
  </v-container>
</template>

<script>
import router from "../../router";

export default {
  name: 'PostPw',
  data() {
    return {
      password: null,
    }
  },
  mounted() {
  },
  methods: {
    getBoardPasswordConfirm() {
      this.$store.dispatch("boardStore/getBoardPasswordConfirm", {
        boardId: this.$route.query.boardId,
        password: this.password,
      }).then(response => {
        if(response.data === true) {
          // alert('비밀번호 맞음');
          router.push({ path: '/post/'+1, query: { boardId: this.$route.query.boardId } })
        } else {
          alert('비밀번호 오류! 다시 입력');
          this.password = null
        }
      })
    },
  },
}
</script>