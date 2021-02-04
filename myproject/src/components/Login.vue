<template>
<div class="container">
  <img alt="Vue logo" src="../assets/logo.png">
  <h1>ログイン画面</h1>
  <br>
  <label for="mail">メールアドレス</label>
  <input type="text" id="mail" placeholder="E-mail" v-model="email">
  <br>
  <label for="password">パスワード</label>
  <input type="password" id="password" placeholder="Password" v-model="password">
  <br><br>
  <button @click="login">ログイン</button>
  <br>
  <router-link to="./Register">新規登録はこちらから</router-link>
</div>
</template>
<script>
import firebase from 'firebase/app'
import "firebase/auth";
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log('login');
      })
      .catch( error => { 
        console.log(error);
      })
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