<template>
  <span>
    {{ '#' + title }}
  </span>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
span {
  display: block;
  background: #808080;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>