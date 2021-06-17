<template>
  <v-app>
    <v-app-bar app clipped-left dense color="green lighten-3"></v-app-bar>
    <v-navigation-drawer app clipped>
      <router-link to="/my-account">내 정보 보기</router-link>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({

  }),
};
</script>

<style lang="scss">
@import "./assets/css/common";
</style>