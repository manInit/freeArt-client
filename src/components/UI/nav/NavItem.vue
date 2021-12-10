<template>
  <li class="item">
    <div v-if="link === 'exit'" class="link d-flex align-items-center">
      <font-awesome-icon class="icon" :icon="['far', icon]" />
      <span>{{ title }}</span>
    </div>
    <div v-else-if="link === 'theme'" class="link d-flex align-items-center">
      <font-awesome-icon class="icon" :icon="['far', icon]" />
      <span>{{ title }}</span>
    </div>
    <router-link v-else :to="link" class="link d-flex align-items-center">
      <font-awesome-icon class="icon" :icon="['far', icon]" />
      <span>{{ title }}</span>
    </router-link>

  </li>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    icon: String,
    title: String,
    link: String,
  },
};
</script>

<style lang="scss" scoped>


.link {
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: block;
  font-size: 20px;
  transition: all 0.2s;
  color: var(--contrast-color);
  &:hover {
    color: var(--active-color);
  }
}
.item {
  width: 270px;
  height: 50px;
  background: var(--nav-bg);
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background: var(--nav-th-color);
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
.icon {
  margin: 0 20px;
}
</style>
