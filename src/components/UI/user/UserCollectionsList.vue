<template>
  <CardList
      :cards-data="cardsData"
      type-card="images"
      :classes-grid="'col-xxl-4 col-lg-6 col-12'"
  />
</template>

<script>
import CardList from '../imageCard/CardList'
import Api from '@/api'

export default {
  name: 'UserCollectionsList',
  components: {
    CardList
  },
  mounted() {
    const id = this.$route.params.id
    Api.getUserCollections(id).then((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].priceBuy = data[i].price
        data[i].price = undefined
      }

      this.cardsData = data
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