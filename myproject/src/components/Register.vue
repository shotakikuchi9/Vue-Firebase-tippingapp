<template>
<v-app>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>新規登録画面</h1>
    <br>
    <label for="user">ユーザー名</label>
    <input type="user" id="user" v-model="userName" placeholder="userName">
    <br>
    <label for="email">メールアドレス</label>
    <input type="text" id="email" v-model="email" placeholder="E-mail">
    <br>
    <label for="password">パスワード</label>
    <input type="password" id="password" v-model="password" placeholder="Password">
    <br><br>
    <v-btn color="blue" outlined @click="register">新規登録</v-btn>
    <br>
    <router-link to="./">ログインはこちらから</router-link>
  </div>
</v-app>
</template>
<script>
export default {
  data() {
    return {
      userName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$store.dispatch('register', {userName: this.userName, email: this.email, password: this.password})
    }
  }  
}
</script>
<style scoped>
.container {
  margin-left: 600px;
}
label {
  margin-right: 10px;
  width: 120px;
  float: left;
}
</style>
