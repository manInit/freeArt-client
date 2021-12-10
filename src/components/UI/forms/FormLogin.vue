<template>
  <form @submit.prevent="login" class="px-5 pt-3 pb-3">
    <div class="mb-3">
      <label for="login" class="form-label">Логин</label>
      <input type="text" placeholder="Введите логин..." class="form-control" id="login"
             aria-describedby="loginHelp"
             v-model="username"
             required
      >
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Пароль</label>
      <input type="password" placeholder="Введите пароль..." class="form-control"
             id="password"
             aria-describedby="passwordHelp"
             v-model="password"
             required
      >
      <div id="passwordHelp" class="form-text text-danger text-center">{{ errMsg }}</div>
    </div>
    <button type="submit">Войти</button>
  </form>
</template>

<script>

export default {
  name: 'FormLogin',
  data() {
    return {
      username: '',
      password: '',
      errMsg: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', { login: this.username, password: this.password }).then(
          ({ id }) => {
            this.username = ''
            this.password = ''
            this.$router.push(`/user/${id}`);
          },
          err => {
            console.log(err.toString())
            if (err.toString() === 'Error: 400') this.errMsg = 'Неверный логин или пароль'
          }
      );
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 4px var(--shadow-color-25);
}
input {
  background: var(--input-bg);
  color: var(--contrast-color);
  &:focus {
    background: var(--input-bg);
    box-shadow: none;
    color: var(--contrast-color);
  }
}
label {
  font-size: 24px;
  color: var(--contrast-color);
}
button {
  border-radius: 20px;
  background: var(--contrast-color);
  color: var(--main-color);
  width: 100%;
  font-weight: bold;
  padding: 10px 0;
}
</style>