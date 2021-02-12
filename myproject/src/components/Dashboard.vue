<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <h3><span>{{ currentUser }}さんようこそ!</span>残高: {{ wallet }} <span><button @click="logout">ログアウト</button></span></h3>    
  </div>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.getters.userName
    },
    wallet() {
      return this.$store.getters.wallet
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  },
  mounted() {
    this.$store.dispatch('onAuth');
    if (!this.$store.getters.status) {
      this.$router.push('/')
    }
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
button {
  font-size: 12px;
}
</style>