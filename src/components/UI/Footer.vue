<template>
  <footer>
    <div class="container h-100">
      <div class="row d-flex h-100 align-items-center">
        <router-link class="col-lg-1 col-sm-2 col-2  text-center" to="/">
          <img height="50" :src="logoSvg" alt="logo" />
        </router-link>
        <router-link class="col-lg-2 col-sm-3 col-4 title" to="/">
          <h2>FreeArt</h2>
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      logoSvg: require('@/assets/logo.svg'),
    }
  },
};
</script>

<style lang="scss" scoped>
.title:hover h2 {
  color: var(--active-color);
}

footer {
  height: 64px;
  box-shadow: 0 4px 4px 2px var(--shadow-color-25);
  background: var(--footer-bg);
}
h2 {
  padding: 0;
  margin: 0;
  font-weight: bold;
  font-size: 36px;
  color: var(--footer-color);
  transition: color 0.2s;
}
</style>
