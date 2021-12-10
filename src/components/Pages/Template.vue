<template>
  <div class="main-container d-flex flex-column">
    <Header />
      <router-view class="flex-grow-1 position-relative"></router-view>
    <Footer />
  </div>
</template>

<script>
import Footer from '../UI/Footer'
import Header from '../UI/Header'


export default {
  name: 'Template',
  components: {
    Footer,
    Header
  },
}
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100vh;
}
</style>