<template>
  <footer :class="{ active: isActive }">
    <div v-if="info.price">
      <h4>Цена</h4>
      <div>{{ info.price }} очков</div>
    </div>
    <div v-else-if="info.priceBuy" class="text-center w-100 m-0">
      <h4>
        Куплена за <span>{{ info.priceBuy }}</span>
      </h4>
    </div>
    <div v-else-if="info.uploadDate" class="text-center w-100 m-0">
      <h4>
        Время публикации <span>{{ dateUpload }}</span>
      </h4>
    </div>
    <div v-if="info.endDate">
      <h4>Окончание</h4>
      <div>
        <Timer :end-date="info.endDate" :time-zone="'UTC'" />
      </div>
    </div>
  </footer>
</template>

<script>
import Timer from '../Timer'
import formatDate from '../../../utils/formatDate'

export default {
  name: 'CardFooter',
  components: {Timer},
  props: {
    info: Object,
  },
  computed: {
    isActive() {
      return this.info.price !== undefined || this.info.priceBuy !== undefined;
    },
    dateUpload() {
      return  formatDate(this.info.uploadDate)
    }
  },
};
</script>

<style lang="scss" scoped>


.active {
  background: var(--purple-color);
}

footer {
  background: var(--nonactive-color);
  color: #fff;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 5px 0;
  & > div {
    margin: 0 30px 0 10px;
  }
  * {
    font-size: 14px;
  }
}
</style>
