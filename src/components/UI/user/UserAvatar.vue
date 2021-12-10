<template>
  <img :src="url" :class="{ large: isLarge, exLarge: isXLarge ,normal: !isLarge && !isXLarge }" alt="аватар" />
</template>

<script>
import Api from '@/api/api'

export default {
  name: 'UserAvatar',
  props: {
    imgUrl: String,
    isLarge: {
      type: Boolean,
      default: false
    },
    isXLarge: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    url() {
      return Api.avatarUrl + this.imgUrl
    }
  }
};
</script>

<style scoped>
.exLarge {
  width: 150px;
  height: 150px;
}
.large {
  width: 60px;
  height: 60px;
}
.normal {
  width: 40px;
  height: 40px;
}
img {
  border-radius: 50%;
  object-fit: cover;
}
</style>
