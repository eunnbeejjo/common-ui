<template>
  <div id="app">
    <DaumPostcode :on-complete="handleAddress"></DaumPostcode>
  </div>
</template>

<script>
import DaumPostcode from 'vuejs-daum-postcode'

export default {
  name: "postcode",
  components: { DaumPostcode },
  data() {
    return {
      zip: '',
      addr1: '',
    }
  },
  methods: {
    handleAddress(data) {
      let zip, addr1;
      if (data.userSelectedType === 'J') {
        addr1 = data.jibunAddress;
      } else {
        addr1 = data.roadAddress;
      }
      zip = data.zonecode;
      this.zip = zip;
      this.addr1 = addr1;
    },
  },
}
</script>