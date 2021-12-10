<template>
  <div class="text-center bg-black">
    <img :src="url" alt="каритнка">
  </div>
</template>

<script>
import Api from '@/api/api'

export default {
  name: 'ImageViewer',
  props: {
    imgUrl: String
  },
  computed: {
    url() {
      return Api.imageUrl + this.imgUrl
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  max-width: 100%;

}
img {
  display: inline-block;
  max-height: 600px;
  max-width: 100%;
  object-fit: contain;
}

</style>