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
            <td><v-btn small color="primary" depressed @click="openWalletDialog(otherUser)">ウォレットを見る</v-btn></td>
            <td><v-btn small color="primary" depressed @click="openSendDialog(otherUser)">送る</v-btn></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <v-dialog v-model="walletDialog" max-width="230">
    <v-card>
      <v-card-title>
        <p style="margin: auto;">{{ otherUser }}さんの残高</p><br><br>
        <p style="margin: auto;">{{ otherUserWallet }}</p>
      </v-card-title>
      <v-card-actions>
        <v-btn @click="walletDialog=false" color="error" style="margin: auto;">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="sendDialog" max-width="230">
    <v-card>
      <v-card-title>
        <p style="margin: auto;">あなたの残高: {{ wallet }}</p><br>
        <p style="margin: auto;">送る金額</p><br>
        <v-text-field solo v-model="amount" type="number"></v-text-field>
      </v-card-title>
      <v-card-actions>
        <v-btn @click="sendMoney" color="error" style="margin: auto;">送信</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-app>
</template>
<script>
export default {
  data() {
    return {
      walletDialog: false,
      sendDialog: false,
      otherUser: '',
      selectedUser: '',
      otherUsers: [],
      amount: '',
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.userName
    },
    wallet() {
      return this.$store.getters.wallet
    },
    otherUserWallet() {
      return this.$store.getters.otherUserWallet
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    openWalletDialog(user) {
      this.$store.dispatch('getUserWallet', user)
      this.otherUser = user
      this.walletDialog = true
    },
    openSendDialog(user) {
      this.sendDialog = true
      this.$store.dispatch('getUserWallet', user)
      this.selectedUser = user
    },
    sendMoney() {
      this.sendDialog = false
      this.$store.dispatch('sendMoney', { amount: this.amount,selectedUser: this.selectedUser })
      this.amount = ''
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