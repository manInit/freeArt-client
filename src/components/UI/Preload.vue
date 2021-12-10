<template>
  <div class="preload">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preload'
}
</script>

<style lang="scss" scoped>
.preload {
  position: absolute;
  top: calc(50% - 2rem);
  left: calc(50% - 2rem);
  & > div {
    width: 4rem;
    height: 4rem;
  }
}
</style>