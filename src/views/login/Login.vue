<template>
  <v-container style="min-height: 100vh" class="d-flex align-center">
    <v-row class="justify-center">
      <v-col>
        <v-card width="300" height="400" class="flex ma-auto py-5 px-7">
          <v-card-title class="justify-center" style="font-size: 28px; ">로 그 인 !!!</v-card-title>
          <v-radio-group row hide-details dense>
            <v-radio label="화주"></v-radio>
            <v-radio label="물류사 "></v-radio>
          </v-radio-group>
          <v-text-field v-model="email" hide-details placeholder="아이디"></v-text-field>
          <v-text-field v-model="password" hide-details placeholder="비밀번호" type="password"></v-text-field>
          <v-checkbox dense hide-details label="아이디/패스워드 기억하기"></v-checkbox>
          <v-btn block depressed class="my-3" @click="login">로그인</v-btn>
          <v-btn block depressed class="my-3" @click="$router.push('/join')">회원가입</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authHttp from "../../api/authHttp";
import {eventBus} from "../../utils/eventbus";

export default {
  name: "Login",
  data() {
    return {
      email: "test5@test.com",
      password: "qwer1234!",
    }
  },
  methods: {
    login() {
      this.$store.dispatch("authStore/login", {
        email: this.email,
        password: this.password,
        // email: "test5@test.com",
        // password: "qwer1234!",
      })
          .then(response => {
            // 로그인 성공 후 토큰값이 발행되었을 경우에만
            if(response.data.access_token) {
              // access_token 이라는 변수에 토큰 값 저장(localStorage 에 저장)
              localStorage.setItem('access_token', response.data.access_token);
              // http.defaults.baseURL = process.env.VUE_APP_API_URI;
              // http 를 임포트 해서 헤더에 Authorization 에 위에서 불러온 access_token 값 추가
              authHttp.defaults.headers.common["Authorization"] = localStorage.getItem("access_token");
              alert('로그인 성공');
              this.$router.push('/general-forum');
            }
          })
          .catch(error => {
            console.log('error', error);
            let value = {type: "error", message: ''}
            eventBus.$emit("alert", value);

          })
    },
  },
}
</script>