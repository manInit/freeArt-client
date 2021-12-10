<template>
  <TopUsers />
  <Tabs class="mt-5" :tabs="tabs" />
  <main class="container flex-grow-1">
    <router-view></router-view>
  </main>
</template>

<script>
import TopUsers from '../UI/userTop/TopUsers'
import Tabs from '../UI/tabs/Tabs'

export default {
  name: 'Main',
  components: {
    TopUsers,
    Tabs,
  },
  created() {
    this.unwatch = this.$store.watch(state => state.auth.status.loggedIn, (newValue) => {
      this.isLogin = newValue
    })
  },
  unmounted() {
    this.unwatch()
  },
  data() {
    return {
      isLogin: this.$store.state.auth.status.loggedIn,
      unwatch: null
    }
  },
  computed: {
    tabs() {

      const privateTabs = this.isLogin ?
          [{ title: 'Подписки', link: '/followers' }] :
          []

      return [
        { title: 'Аукционы', link: '/auctions' },
        { title: 'Новые работы', link: '/images' },
        ...privateTabs
      ]
    }
  }
}
</script>

<style scoped></style>
