<template>
  <form @submit.prevent="register" class="px-5 pt-3 pb-3">
    <div class="mb-3">
      <label for="login" class="form-label">Логин</label>
      <input type="text" placeholder="Введите логин..." class="form-control" id="login"
             aria-describedby="loginHelp"
             autocomplete="off"
             v-model="login"

      >
      <div id="loginHelp" class="form-text text-danger">{{ error.login }}</div>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Пароль</label>
      <input type="password" placeholder="Введите пароль..." class="form-control"
             id="password"
             aria-describedby="passwordHelp"
             v-model="password"

      >
      <div id="passwordHelp" class="form-text text-danger">{{ error.password }}</div>
    </div>
    <div class="mb-3">
      <label for="passwordCheck" class="form-label">Подтвердите пароль</label>
      <input type="password" placeholder="Повторите пароль..." class="form-control"
             id="passwordCheck"
             aria-describedby="passwordCheckHelp"
             v-model="passwordCheck"

      >
        <div id="passwordCheckHelp" class="form-text text-danger">{{ error.passwordEq }}</div>
    </div>
    <button type="submit">Зарегистрироваться</button>
  </form>
</template>

<script>

export default {
  name: 'FormRegister',
  data() {
    return {
      login: '',
      password: '',
      passwordCheck: '',
      error: {
        login: '',
        password: '',
        passwordEq: ''
      }
    }
  },
  watch: {
    login(value) {
      this.validateLogin()
      this.login = value
    },
    password(value) {
      this.validatePassword()
      this.password = value
    },
    passwordCheck(value) {
      this.validateEquelPassword()
      this.passwordCheck = value
    }
  },
  methods: {
    validateLogin() {
      if (this.login.length < 4) {
        this.error.login = 'Логин должен быть больше 3-х символов'
        return false
      } else {
        this.error.login = ''
        return true
      }
    },
    validatePassword() {
      if (this.password.length < 8) {
        this.error.password = 'Пароль должен быть не менее 8 символов'
        return false
      } else {
        this.error.password = ''
        this.validateEquelPassword()
        return true
      }
    },
    validateEquelPassword() {
      if (this.password !== this.passwordCheck) {
        this.error.passwordEq = 'Пароли не совпадают'
        return false
      } else {
        this.error.passwordEq = ''
        return true
      }
    },
    validateAll() {
      const res = [];
      res.push(this.validateLogin())
      res.push(this.validatePassword())
      res.push(this.validateEquelPassword())
      return !res.includes(false)
    },
    register() {
      if (!this.validateAll()) {
        return
      }

      this.$store.dispatch('auth/register', {
        login: this.login,
        password: this.password
      }).then(
          ({ id }) => {
            this.login = ''
            this.password = ''
            this.passwordCheck = ''
            this.$router.push(`/user/${id}`);
          },
          err => {
            this.error.login = err.message
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
label {
  font-size: 24px;
  color: var(--contrast-color);
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
button {
  border-radius: 20px;
  background: var(--contrast-color);
  color: var(--main-color);
  width: 100%;
  font-weight: bold;
  padding: 10px 0;
}
</style>