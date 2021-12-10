<template>
  <span>
    {{ currentTime.split('.')[0] }}
  </span>
</template>

<script>
import Timer from '@/utils/timer'

export default {
  name: 'Timer',
  props: {
    endDate: String,
    timeZone: String,
  },
  methods: {
    tick() {
      this.currentTime = this.timer.timeDiffCalc()
      if (!this.currentTime) {
        clearInterval(this.intervalId)
        this.currentTime = ''
        this.$emit('timeEnd')
      }
    },
    start() {
      if (!this.endDate) return
      this.timer = new Timer(this.endDate, this.timeZone)
      if (!this.intervalId)
        this.intervalId = setInterval(this.tick, 1000)
      else {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.tick, 1000)
      }
    }
  },
  watch: {
    endDate() {
      this.start()
    }
  },
  mounted() {
    this.start()
  },
  unmounted() {
    if (this.intervalId)
        clearInterval(this.intervalId)
  },
  data() {
    return {
      currentTime: '- - : - - : - - ',
      timer: null,
      intervalId: null
    }
  }
}
</script>

<style scoped>

</style>