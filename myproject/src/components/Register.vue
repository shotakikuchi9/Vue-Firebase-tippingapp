<template>
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
	<button @click="register">新規登録</button>
	<br>
	<router-link to="./">ログインはこちらから</router-link>
</div>
</template>
<script>
import axios from 'axios'
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
      axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAefVUnk7Ie_rchCMkHBVlhn_wcyfdHKlc',
        {
          email: this.email,
          password: this.password,
          returnSecureToken: true
        }
      ).then(response => {
        console.log(response);
      })
      this.userName = '';
      this.email = '';
      this.password = '';
    }
  }
  
}
</script>
<style scoped>
.container {
 margin-left: 600px;
}
input {
width: 140px;
float: right;
margin-right: 560px;
}
button {
	margin-left: 40px;
}

</style>