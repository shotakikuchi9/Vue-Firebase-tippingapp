<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <h3><span>{{currentUser}}さんようこそ!</span>残高: {{wallet}}</h3>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';

export default {
  data() {
    return {
      currentUser: firebase.auth().currentUser.displayName,
      wallet: ''
    }
  },
  created() {
    const db = firebase.firestore();
    const walletRef = db.collection('users').doc(firebase.auth().currentUser.displayName);
    let vc = this
    walletRef
    .get()
    .then(function(doc) {
        vc.wallet = doc.data().wallet;
        console.log(doc.data().name);
        console.log(doc.data().wallet);
    }) 
    .catch((error) => {
      console.log(error);
    })
  }
}
</script>
<style scoped>
.container {
  margin-left: 600px;
}
span {
  margin-right: 32px;
}
</style>