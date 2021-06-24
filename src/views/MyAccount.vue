<template>
  <v-container>
    <v-card class="pa-15">
      <v-card-title class="mb-10">내 계정 정보</v-card-title>
      <v-row>
        <v-col>
          <v-img v-if="myAccount.profile.id" :src="'https://account.dkargo.io:17302/files/' + myAccount.profile.url" width="150" height="200"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2"><p style="margin-top: 16px; padding-top: 4px;">유저 타입</p></v-col>
        <v-col><v-text-field readonly v-model="myAccount.userType"></v-text-field></v-col>
        <v-col cols="2"><p style="margin-top: 16px; padding-top: 4px;">타입</p></v-col>
        <v-col><v-text-field readonly v-model="myAccount.role"></v-text-field></v-col>
      </v-row>
      <v-row>
        <v-col><p style="margin-top: 16px; padding-top: 4px;">이름</p></v-col>
        <v-col><v-text-field readonly v-model="myAccount.name" hide-details></v-text-field></v-col>
        <v-col><p style="margin-top: 16px; padding-top: 4px;">닉네임</p></v-col>
        <v-col><v-text-field readonly v-model="myAccount.nickName" hide-details></v-text-field></v-col>
        <v-col><p style="margin-top: 16px; padding-top: 4px;">성별</p></v-col>
        <v-col><v-text-field readonly v-model="myAccount.gender"></v-text-field></v-col>
      </v-row>
      <v-row>
        <v-col><p style="margin-top: 16px; padding-top: 4px;">아이디</p></v-col>
        <v-col><v-text-field readonly v-model="myAccount.email" hide-details></v-text-field></v-col>
      </v-row>
<!--      <v-row>
        <v-col><p style="margin-top: 16px; padding-top: 4px;">비밀번호</p></v-col>
        <v-col><v-text-field placeholder="비밀번호" type="password" v-model="password" autocomplete="new-password" hide-details></v-text-field></v-col>
        <v-col><p style="margin-top: 16px; padding-top: 4px;">비밀번호 확인</p></v-col>
        <v-col><v-text-field placeholder="비밀번호 확인" type="password" v-model="passwordConfirm" autocomplete="new-password" hide-details></v-text-field></v-col>
      </v-row>-->
      <v-divider class="my-10" />
      <v-row>
        <v-col><p style="margin-top: 16px; padding-top: 4px;">전화번호('-' 제외)</p></v-col>
        <v-col><v-text-field readonly v-model="myAccount.phone" hide-details></v-text-field></v-col>
        <v-col><p style="margin-top: 16px; padding-top: 4px;">생년월일</p></v-col>
        <v-col><v-text-field readonly v-model="myAccount.birth"></v-text-field></v-col>
      </v-row>
      <v-row>
        <v-col><p style="margin-top: 16px; padding-top: 4px;">주소</p></v-col>
        <v-col>
          <v-row>
            <v-col><v-text-field readonly hide-details style="width: 150px;" v-model="myAccount.addresses[0].zipCode"></v-text-field></v-col>
            <v-col>
            </v-col>
          </v-row>
          <v-row><v-col><v-text-field hide-details readonly v-model="myAccount.addresses[0].address"></v-text-field></v-col></v-row>
          <v-row><v-col><v-text-field hide-details v-model="myAccount.addresses[0].subAddress"></v-text-field></v-col></v-row>
          <v-row><v-col><v-checkbox hide-details label="기본 주소지로" v-model="myAccount.addresses[0].baseAddress"></v-checkbox></v-col></v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'MyAccount',
  data() {
    return {
      myAccount: {
        email: '',
        name: '',
        nickName: '',
        birth: '',
        phone: '',
        gender: '',
        userType: '',
        role: '',
        addresses: [
          {
            id: '',
            address: '',
            subAddress: '',
            zipCode: '',
            baseAddress: true,
          }
        ],
        profile: {
          id: '',
          url: '',
        }
      },
    }
  },
  mounted() {
    this.getMyAccount();
  },
  methods: {
    getMyAccount() {
      let access_token = localStorage.getItem('access_token');
      this.$store.dispatch("authStore/getMyAccount").then(response => {
        console.log(response, 'response');
        this.myAccount = response.data;
        console.log(this.myAccount, 'my account');
      })
    },
  },
}
</script>