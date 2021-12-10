<template>
  <CardList
      :cards-data="cardsData"
      type-card="auctions"
      :classes-grid="'col-xxl-3 col-xl-4 col-lg-4 col-md-6'"
  />
</template>

<script>
import CardList from '../imageCard/CardList'
import Api from '@/api'

export default {
  name: 'NewAuctionsList',
  components: {
    CardList
  },
  mounted() {
    Api.getNewAuctions().then(data => {
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