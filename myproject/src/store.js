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
    status: false,
    email: '',
    otherUserWallet: '',
    otherUsers: [],

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
    },
    email(state) {
      return state.email
    },
    otherUserWallet(state) {
      return state.otherUserWallet
    },
    otherUsers(state) {
      return state.otherUsers
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
    },
    setEmail(state, email) {
      state.email = email
    },
    setOtherUserWallet(state, otherUserWallet) {
      state.otherUserWallet = otherUserWallet
    },
    setOtherUsers(state, otherUser) {
      state.otherUsers.push(otherUser)
    },
    resetOtherUsers(state) {
      state.otherUsers = [];
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
        commit('setEmail', email)
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
    onAuth({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit('changeStatus', true)
        } else {
          commit('changeStatus', false)
        }
      })
    },
    getUserWallet({ commit }, otherUser) {
      const db = firebase.firestore();
      const userWalletRef = db.collection('users').doc(otherUser)
      userWalletRef
      .get()
      .then(doc => {
        const otherUserWallet = doc.data().wallet
        commit('setOtherUserWallet', otherUserWallet);
      })
    },
    getOtherUsers({ commit }) {
      const currentUserEmail = firebase.auth().currentUser.email
      const db = firebase.firestore()
      const usersRef = db.collection('users')
      commit('resetOtherUsers')
      usersRef
      .where('email', '!=', currentUserEmail)
      .get()
      .then(users => {
        users.forEach(user => {
        commit('setOtherUsers', user.id)
        })
      })
    },
    sendMoney( { commit, getters }, { amount, selectedUser }) {
      const db = firebase.firestore();
      const currentUserRef = db.collection('users').doc(getters.userName)
      currentUserRef.update({
        wallet: Number(getters.wallet) - Number(amount)
      })
      currentUserRef
      .get()
      .then(doc => {
        commit('setWallet', doc.data().wallet)
      })
      const selectedUserRef = db.collection('users').doc(selectedUser)
      selectedUserRef.update({
        wallet: Number(getters.otherUserWallet) + Number(amount)
      })
      selectedUserRef
      .get()
      .then(doc => {
        commit('setOtherUserWallet', doc.data().wallet)
      })
    }
  }
});

  