<template>
  <v-container style="min-height: 100vh" class="d-flex align-center">
    <v-row class="justify-center">
      <v-col>
        <v-card width="300" height="400" class="flex ma-auto py-5 px-7">
          <v-card-title>로 그 인 !!!</v-card-title>
          <v-radio-group row hide-details dense>
            <v-radio label="화주"></v-radio>
            <v-radio label="물류사 "></v-radio>
          </v-radio-group>
          <v-text-field hide-details placeholder="아이디"></v-text-field>
          <v-text-field hide-details placeholder="비밀번호" type="password"></v-text-field>
          <v-checkbox dense hide-details label="아이디/패스워드 기억하기"></v-checkbox>
          <v-btn block depressed class="my-3">로그인</v-btn>
          <v-btn block depressed class="my-3" @click="$router.push('/join')">회원가입</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
}
</script>