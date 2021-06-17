<template>
  <v-container>
    내 정보!!!
  </v-container>
</template>

<script>
export default {
  name: 'MyAccount',
  data() {
    return {}
  },
  mounted() {
    this.getMyAccount();
  },
  methods: {
    getMyAccount() {
      this.$store.dispatch("authStore/getMyAccount", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("access_token")
        }
      }).then(response => {
        console.log(response, 'response');
      })
    },
  },
}
</script>