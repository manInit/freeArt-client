<template>
  <CardList
      :cards-data="cardsData"
      type-card="images"
      :classes-grid="'col-xxl-4 col-lg-6 col-12'"
      :no-link="true"
  />
</template>

<script>
import Api from '@/api'
import CardList from '../imageCard/CardList'

export default {
  name: 'UserModerationList',
  components: {
    CardList
  },
  mounted() {
    Api.getUsersInvalidImage(this.$store.state.auth.userId, localStorage.getItem('token'))
        .then((data) => (this.cardsData = data.reverse()))
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