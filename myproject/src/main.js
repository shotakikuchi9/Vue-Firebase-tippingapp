import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { config } from './firebase.config'
import vuetify from './plugins/vuetify';
const admin = require('firebase-admin');
admin.initializeApp();

firebase.initializeApp(config);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
