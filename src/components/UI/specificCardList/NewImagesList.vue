<template>
  <CardList
      :cards-data="cardsData"
      type-card="images"
      :classes-grid="'col-xxl-3 col-xl-4 col-lg-4 col-md-6'"
  />
</template>

<script>
import Api from '@/api'
import CardList from '../imageCard/CardList'

export default {
  name: 'NewImagesList',
  components: {
    CardList
  },
  mounted() {
    Api.getNewImages().then((data) => (this.cardsData = data))
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