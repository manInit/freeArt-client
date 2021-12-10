<template>
  <CardList
      :cards-data="cardsData"
      type-card="auctions"
      :classes-grid="'col-xxl-4 col-lg-6 col-12'"
  />
</template>

<script>
import Api from '@/api'
import CardList from '../imageCard/CardList'

export default {
  name: 'UserAuctionParticipateList',
  components: {
    CardList
  },
  mounted() {
    Api.getAuctionsParticipate(localStorage.getItem('token')).then((data) => (this.cardsData = data))
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