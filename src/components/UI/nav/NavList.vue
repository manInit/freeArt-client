<template>
  <ul class="menu__list">
    <NavItem
      v-for="(item) in items"
      :key="item.link"
      :icon="item.icon"
      :title="item.title"
      :link="item.link"
      @click="e => isClick(item.link)"
    />
  </ul>
</template>

<script>
import NavItem from './NavItem.vue';
import setTheme from '@/utils/setTheme'

export default {
  name: 'Header',
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
      unwatch: null,
      theme: localStorage.getItem('theme') ?? 'light'
    }
  },
  computed: {
    items() {
      const id = this.$store.state.auth.userId
      const role = this.$store.state.auth.userRole

      const privateItems = this.isLogin ? [
        {
          icon: 'image',
          title: 'Загрузить работу',
          link: '/upload',
        },
        {
          icon: 'hand-pointer',
          title: 'Играть в кликер',
          link: '/clicker',
        },
        {
          icon: 'times-circle',
          title: 'Выйти',
          link: 'exit'
        }
      ] : []

      const adminItems = role === 'ADMIN' ? [
        {
          icon: 'edit',
          title: 'Модерация',
          link: '/moderation'
        }
      ] : []

      return [{
        icon: 'user',
        link: this.isLogin ? `/user/${id}` : '/auth',
        title: this.isLogin ? 'Аккаунт' : 'Вход/Регистрация'
      }, {
       icon: this.theme === 'light' ? 'moon' : 'sun',
       link: 'theme',
       title: 'Сменить тему'
      }, ...adminItems, ...privateItems]
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    },
    isClick(link) {
      if (link === 'exit') this.logout()
      if (link === 'theme') this.changeTheme()
    },
    changeTheme() {
      let theme = localStorage.getItem('theme') ?? 'light'

      if (theme === 'light') theme = 'dark'
      else theme = 'light'

      this.theme = theme
      setTheme(theme)
    },
    hideMenu() {

    }
  },
  components: {
    NavItem,
  },
};
</script>

<style lang="scss" scoped>
.menu__list {
  box-shadow: 0 4px 4px var(--shadow-color-25);
  border-radius: 0 0 10px 10px;
}
</style>
