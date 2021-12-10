<template>
  <div class="container">
    <Tab
        v-for="tab in tabs"
        :key="tab.title"
        :title="tab.title"
        :link="tab.link"
    />
  </div>
</template>

<script>
import Tab from './Tab';

export default {
  name: 'Tabs',
  components: {
    Tab,
  },
  props: {
    tabs: Object
  }
};
</script>

<style scoped></style>
