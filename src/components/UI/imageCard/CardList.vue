<template>
  <ul v-if="cardsData !== null && cardsData.length !== 0" class="row mt-3">
    <li
      v-for="card in cards"
      :key="card.id"
      :class="classesGrid"
    >
      <Card
        :title="card.title"
        :img-url="card.url"
        :footer-info="footerInfoObject(card)"
        :user-owner="card.owner"
        :user-author="card.creator || card.owner"
        :link="!noLink ? getLink + card.id : false"
      />
    </li>
  </ul>
  <Preload v-else-if="cardsData === null" />
  <div class="empty text-center mt-5 mb-5" v-else>
    Здесь пусто
  </div>
</template>

<script>
import Card from './Card';
import Preload from '../Preload'

export default {
  name: 'CardList',
  components: {
    Preload,
    Card,
  },
  props: {
    cardsData: Array,
    typeCard: String,
    classesGrid: {
      type: String,
      default: 'col-xl-3 col-lg-4 col-md-6 col-sm-12'
    },
    noLink: {
      type: Boolean,
      default: false
    }
  },
  methods: {

    footerInfoObject(card) {
      const obj = {}
      if (card.uploadDate) obj.uploadDate = card.uploadDate
      if (card.price) obj.price = card.price
      if (card.endDate) {
        obj.endDate = card.endDate
      }
      if (card.priceBuy) obj.priceBuy = card.priceBuy
      return obj
    }
  },
  computed: {
    getLink() {
      return this.typeCard === 'images' ? '/image/' : '/auction/'
    },
    cards() {
      const temp = this.cardsData
      if (this.typeCard === 'auctions') {
        for (let i = 0; i < this.cardsData.length; i++) {
          temp[i].title = this.cardsData[i].image.title
          temp[i].owner = this.cardsData[i].image.owner
          temp[i].url = this.cardsData[i].image.url
          //temp[i].uploadDate = this.cardsData[i].image.uploadDate
        }
      }
      return temp;
    },
  }
};
</script>

<style lang="scss" scoped>
ul {
  min-height: 450px;
}
.empty {
  font-size: 30px;
  color: var(--contrast-color);
}
</style>
