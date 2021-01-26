import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import "firebase/auth";

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyAefVUnk7Ie_rchCMkHBVlhn_wcyfdHKlc",
  authDomain: "vue4-ed40b.firebaseapp.com",
  projectId: "vue4-ed40b",
  storageBucket: "vue4-ed40b.appspot.com",
  messagingSenderId: "464933463808",
  appId: "1:464933463808:web:6d1e290cf7a740d4d0f5e5"
}

firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
