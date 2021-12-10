<template>
  <CardList
      :cards-data="cardsData"
      type-card="images"
      :classes-grid="'col-xxl-3 col-xl-4 col-lg-4 col-md-6'"
  />
</template>

<script>
import CardList from '../imageCard/CardList'
import Api from '@/api'

export default {
  name: 'ModerationList',
  components: {
    CardList
  },
  mounted() {
    Api.getModerationImages(localStorage.getItem('token')).then(data => {
      this.cardsData = data

      const idModerations = data.map(item => item.id)
      localStorage.setItem('moderation-list', JSON.stringify(idModerations.reverse()))
    })
  },
  data() {
    return {
      cardsData: null
    }
  }
}
</script>

<style scoped>

</style>