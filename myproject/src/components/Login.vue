<template>
<div class="container">
  <img alt="Vue logo" src="../assets/logo.png">
  <h1>ログイン画面</h1>
  <br>
	<label for="mail">メールアドレス</label>
	<input type="text" id="mail" placeholder="E-mail">
	<br>
	<label for="password">パスワード</label>
	<input type="password" id="password" placeholder="Password">
	<br><br>
	<button>新規登録</button>
	<br>
	<router-link to="./Register">新規登録はこちらから</router-link>
</div>
</template>
<script>
export default {
  
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