<template>
    <router-link :to="link" custom v-slot="{ navigate, href, isExactActive }">
      <button :class="[ isExactActive && 'router-link-active' ]">
        <a :href="href" @click="navigate">{{ title }}</a>
      </button>
    </router-link>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    title: String,
    link: String,
  },
};
</script>

<style lang="scss" scoped>


a {
  display: inline-block;
  line-height: 47px;
  width: 100%;
  height: 100%;
  transition: color 0.3s, border-color 0.3s;
  font-size: 20px;
  color: #c2c2c2;
}

button {
  outline: none;
  background: var(--main-color);
  border: 1px solid #c2c2c2;
  height: 47px;
  padding: 0 15px;
  transition: color 0.3s, border-color 0.3s;

  &.router-link-active {
    border-color: var(--purple-color);
  }

  &.router-link-active a {
    color: var(--purple-color);
  }

  &:not(.router-link-active):hover,
  &:not(.router-link-active):hover a {
    color: var(--link-hover);
    border-color: var(--link-hover);
  }
}
</style>
