<template>
  <header>
    <div class="container h-100">
      <div class="row d-flex h-100 align-items-center">
        <router-link class="col-lg-1 col-sm-2 col-2 text-center" to="/">
          <img height="50" :src="logoSvg" alt="logo" />
        </router-link>
        <router-link class="col-lg-2 col-sm-3 col-4" to="/">
          <h2>FreeArt</h2>
        </router-link>
        <NavBar class="offset-lg-8 offset-sm-5 offset-1 col-lg-1 col-sm-2 col-4" />
      </div>
    </div>
  </header>
</template>

<script>
import NavBar from './nav/NavBar.vue';

export default {
  name: 'Header',
  data() {
    return {
      logoSvg: require('@/assets/logo.svg'),
    };
  },
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 64px;
  box-shadow: 0 4px 4px 2px var(--shadow-color-25);
  background: var(--header-bg);
  position: sticky;
  top: 0;
  z-index: 5;
}
h2 {
  padding: 0;
  margin: 0;
  font-weight: bold;
  font-size: 36px;
  transition: color 0.2s;
  &:hover {
    color: var(--active-color);
  }
}
</style>
