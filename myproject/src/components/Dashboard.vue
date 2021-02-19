<template>
<v-app>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <h3><span>{{ currentUser }}さんようこそ!</span>残高: {{ wallet }} <span><v-btn small color="blue" outlined @click="logout">ログアウト</v-btn></span></h3> 
    <br>
    <h1>ユーザ一覧</h1>  
    <div>
      <table>
        <thead>
          <tr>
            <th>ユーザ名</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="otherUser in otherUsers" :key="otherUser">
          <tr>
            <td class="td">{{ otherUser }}</td>
            <td><v-btn small color="primary" depressed @click="openDialog(otherUser)">ウォレットを見る</v-btn></td>
            <td><v-btn small color="primary" depressed>送る</v-btn></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <v-dialog v-model="dialog" max-width="230">
    <v-card>
      <v-card-title>
        {{ otherUser }}さんの残高<br><br>
        {{ otherUserWallet}}
      </v-card-title>
      <v-card-actions>
        <v-btn @click="dialog=false" color="error">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-app>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      otherUser: '',
      otherUserWallet: '',
      otherUsers: []
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.userName
    },
    wallet() {
      return this.$store.getters.wallet
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    openDialog(user) {
      this.dialog = true
      this.$store.dispatch('getUserWallet', user)
      this.otherUser = user
      this.otherUserWallet = this.$store.getters.otherUserWallet
    }
  },
  mounted() {
    this.$store.dispatch('onAuth');
    if (!this.$store.getters.status) {
      this.$router.push('/')
    }
    this.$store.dispatch('getOtherUsers')
    this.otherUsers = this.$store.getters.otherUsers
  }
}
</script>
<style scoped>
img {
  margin-left: 600px;
}
h3 {
  margin-left: 520px;
}
span {
  margin-right: 32px;
}
button {
  font-size: 12px;
}
h1 {
  text-align: center;
}
table {
  margin-left: 520px;
}
.td {
  text-align: center;
  width: 160px;
}
</style>