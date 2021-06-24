<template>
  <v-app>
    <v-app-bar app clipped-left dense color="green lighten-3"></v-app-bar>
    <v-navigation-drawer app clipped>
      <v-list>
        <v-list-item-group v-model="selectedMenu">
          <v-list-item v-for="(item, i) in menuList" :key="i" link :to="item.router">
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
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
    selectedMenu: '',
    menuList: [
      { text: '로그인', router: '/login'},
      { text: '게시판', router: '/general-forum'},
      { text: '내 정보 보기', router: '/my-account'},
    ]
  }),
};
</script>

<style lang="scss">
@import "./assets/css/common";
</style>