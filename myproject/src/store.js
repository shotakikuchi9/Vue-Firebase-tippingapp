import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import Router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    wallet: '',
    status: false
  },
  getters: {
    userName(state) {
      return state.userName
    },
    wallet(state) {
      return state.wallet
    },
    status(state) {
      return state.status
    }
  },
  mutations: {
    setUserName(state, name) {
      state.userName = name
    },
    setWallet(state, wallet) {
      state.wallet = wallet
    },
    changeStatus(state, status) {
      state.status = status
    }
  },
  actions: {
    login({ commit, getters }, { email, password }) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((profile) => {
        commit('setUserName', profile.user.displayName);
        const db = firebase.firestore();
        const walletRef = db.collection('users').doc(getters.userName);
        walletRef
        .get()
        .then(function(doc) {
          commit('setWallet', doc.data().wallet);
        }) 
        .catch((error) => {
          console.log(error);
        })
        Router.push('/dashboard');
      })
      .catch((error) => { 
        console.log(error);
      })
      email = '';
      password = '';
    },
    register({ commit, getters }, { userName, email, password }) {
      firebase.auth().createUserWithEmailAndPassword(email, password) 
      .then(() => {
        firebase.auth().currentUser.updateProfile({
        displayName: userName
        }).then(() => {
          Router.push('/dashboard');
        }).catch((error) => {
          console.log(error);
        })
        const db = firebase.firestore()
        commit('setUserName', userName);
        commit('setWallet', 500);
        db.collection('users').doc(userName).set(getters);
      })
      .catch(error => {
        console.log(error);
        userName = '';
        email = '';
        password = '';
      })
    },
    logout() {
      firebase.auth().signOut()
      .then(() => {
        Router.push('/');
      })
      .catch(error => {
        console.log(error);
      })
    },
    onAuth( { commit }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit('changeStatus', true)
        } else {
          commit('changeStatus', false)
        }
      })
    }
  }
});

  