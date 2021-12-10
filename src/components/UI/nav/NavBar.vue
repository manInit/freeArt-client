<template>
  <nav class="menu d-flex justify-content-end"
       @mouseover="show"
       @mouseleave="hide"
       @click="toggle"
  >
    <div class="menu__icon">
      <font-awesome-icon class="menu__icon_user" :icon="['far', 'user']" />
    </div>
    <NavList v-if="isVisible" class="menu__nav" />
  </nav>
</template>

<script>
import NavList from './NavList.vue';

export default {
  name: 'Header',
  data() {
    return {
      logoSvg: require('@/assets/logo.svg'),
      isVisible: false
    };
  },
  components: {
    NavList,
  },
  methods: {
    show() {
      if (window.matchMedia('(max-width: 400px)').matches) return
      this.isVisible = true
    },
    hide() {
      this.isVisible = false
    },
    toggle() {
      this.isVisible = !this.isVisible
    },
  }
};
</script>

<style lang="scss" scoped>
.menu {
  position: relative;
  &__icon {
    background-color: var(--user-icon-bg);
    border-radius: 50%;
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    &_user {
      color: var(--user-icon-color);
      font-size: 36px;
    }
  }
  &__nav {
    position: absolute;
    top: 100%;
    padding: 0;
    margin: 0;
    display: block;
    z-index: 2;
  }
}
</style>
