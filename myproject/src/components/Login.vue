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
        this.$store.commit('setUserName', firebase.auth().currentUser.displayName)
        const db = firebase.firestore();
        const walletRef = db.collection('users').doc(this.$store.getters.userName);
        let vc = this
        walletRef
        .get()
        .then(function(doc) {
          vc.$store.commit('setWallet', doc.data().wallet);
        }) 
        .catch((error) => {
          console.log(error);
        })
        this.$router.push('/dashboard');
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