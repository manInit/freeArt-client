<template>
  <font-awesome-icon
      class="icon"
      :icon="['fas', isAsc ? 'sort-up' : 'sort-down']"
      @click="clickHandler"
  />
</template>

<script>
import createDebounce from '../../../utils/debounce'

export default {
  name: 'SortIcon',
  data() {
    return {
      isAsc: true
    }
  },
  mounted() {
    this.clickHandler = createDebounce(this.clickHandler.bind(this), 100)
  },
  methods: {
    clickHandler() {
      this.isAsc = !this.isAsc
      this.$emit('sortClick')
    }
  }
}
</script>

<style scoped>
* {
  user-select: none;
  cursor: pointer;
}
</style>