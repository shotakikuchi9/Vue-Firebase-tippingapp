<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <h3><span>{{ currentUser }}さんようこそ!</span>残高: {{ wallet }}</h3>
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
</style>