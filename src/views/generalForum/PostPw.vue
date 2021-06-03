<template>
  <v-container>
    비밀번호를 입력하시오
    <v-text-field placeholder="비밀번호" type="password"></v-text-field>
    <v-btn @click="$router.push('/general-forum')">취소</v-btn>
    <v-btn @click="$router.push('/post')">확인</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'PostPw',
}
</script>