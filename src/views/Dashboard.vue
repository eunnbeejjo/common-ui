<template>
<v-container>
  <v-card class="ma-5 pa-5" height="500">
    <router-link to="/login">로그인</router-link>
    <v-divider />
    <router-link to="/general-forum">게시판</router-link>
  </v-card>
</v-container>
</template>

<script>
export default {
  name: "Dashboard",
}
</script>