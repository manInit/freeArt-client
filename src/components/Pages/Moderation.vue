<template>
  <div class="container-fluid">
    <div class="content mt-5">
      <Tabs :tabs="tabs" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Tabs from '../UI/tabs/Tabs'
export default {
  name: 'Moderation',
  components: {
    Tabs
  },
  computed: {
    tabs() {
      return [
        { title: 'Модерация картинок', link: '/moderation/'},
        { title: 'Модерация тегов', link: '/moderation/tags'},
        { title: 'Получение отчетов', link: '/moderation/docs'}
      ]
    }
  }
}
</script>

<style scoped>

</style>