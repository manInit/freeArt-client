<template>
  <div class="container">
    <div class="row text-center mt-5">
      <div class="text-center">
        <router-link to="/auth" custom v-slot="{ navigate, href, isExactActive }">
          <a :href="href" @click="navigate" :class="[ isExactActive && 'router-link-active' ]">Логин</a>
        </router-link>
        <router-link to="/auth/register" custom v-slot="{ navigate, href, isExactActive }">
          <a :href="href" @click="navigate" :class="[ isExactActive && 'router-link-active' ]">Регистрация</a>
        </router-link>
      </div>
    </div>
    <div class="row mb-5">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss" scoped>

.router-link-active {
  color: var(--purple-color);
  border-bottom: 1px solid var(--purple-color);
}
a {
  margin-left: 10px;
  display: inline;
  color: #8D8D8D;
  font-size: 20px;
}
</style>