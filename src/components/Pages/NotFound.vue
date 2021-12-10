<template>
  <div class="root d-flex flex-column" ref="root">
    <div class="text-center text flex-grow-1 px-4">
      <h2 class="mb-4">Вы нашли секретную страницу</h2>
      <router-link to="/">Вернуться домой</router-link>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  mounted() {
    console.log(this.$refs.canvas)
    const canvas = this.$refs.canvas
    canvas.height = this.$refs.root.offsetHeight
    canvas.width = this.$refs.root.offsetWidth


    const ctx = canvas.getContext('2d')


    function rnd(a, b) {
      return Math.floor(Math.random() * (b - a + 1)) + a
    }

    function rndColor() {
      let c = '#'
      for (let i = 0; i < 6; i++) {
        c += rnd(0, 15).toString(16)
      }
      return c
    }

    let run = function () {
      let x = rnd(0, canvas.width)
      let y = rnd(0, canvas.height)
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x - 1, y + 1)
      ctx.strokeStyle = rndColor()
      ctx.fillStyle = rndColor()
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
    }

    let run404 = function () {
      let x = rnd(0, 1500)
      let y = rnd(0, 750)
      ctx.fillText('404', x, y)
    }

    setInterval(run, 50)
    setInterval(run404, 200)
  }
}
</script>

<style lang="scss" scoped>
* {
  color: #fff;
}

.root {
  position: relative;
}

canvas {
  position: absolute;
  top: 0;
  z-index: -1;
  background: black;
}

.text {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}
</style>