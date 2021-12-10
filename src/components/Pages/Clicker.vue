<template>
  <div class="container">
    <h3 class="text-center fw-bold text-uppercase mt-5">
      Количество очков <br>
      {{ points }}
    </h3>
    <div @click="click"
        class="clicker user-select-none mx-auto rounded-circle circle1">
      Клик
      <div class="rounded-circle circle2"></div>
      <div class="rounded-circle circle3"></div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import createDebounce from '@/utils/debounce'

export default {
  name: 'Clicker',
  data() {
    return {
      points: '???',
      setPoints: null
    }
  },
  mounted() {
    this.setPoints = createDebounce(this.updatePoints.bind(this))

    Api.getPoints(this.$store.state.auth.userId).then(data => {
      this.points = +data.points
    })
  },
  methods: {
    click() {
      this.points++
      if (this.setPoints)
        this.setPoints()
    },
    updatePoints() {
      Api.setPoints(this.points, localStorage.getItem('token')).then(data => {
        console.log(data.points)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  color: var(--contrast-color);
}
.clicker {
  margin: 2em 0;
  transition: background-color 0.2s;
  &:hover {
    background: var(--active-color);
  }
}

.circle1 {
  cursor: pointer;
  text-align: center;
  line-height: 240px;
  width: 240px;
  height: 240px;
  font-size: 36px;
  color: #fff;
  background: var(--purple-color);
  position: relative;
}

.circle2 {
  position: absolute;
  width: 300px;
  height: 300px;
  top: calc(50% - 150px);
  left: calc(50% - 150px);
  opacity: 0.6;
  background: #5061FF;
  z-index: -1;
}
.circle3 {
  position: absolute;
  width: 350px;
  height: 350px;
  top: calc(50% - 175px);
  left: calc(50% - 175px);
  opacity: 0.6;
  background: #D7DBFF;
  z-index: -1;
}
</style>