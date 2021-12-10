<template>
  <button
      @update="$emit('update')"
      v-if="isLoaded"
      @click="clickHandler"
      :class="{ active: !isFollow, secondary: isFollow }"
  >
    {{ isFollow ? 'Отписаться' : 'Подписаться' }}
  </button>
  <div v-else>

  </div>
</template>

<script>
import Api from '@/api'

export default {
  name: 'FollowedButton',
  props: {
    idUser: Number
  },
  data() {
    return {
      isFollow: false,
      isLoaded: false
    }
  },
  mounted() {
    this.followCheck()
  },
  methods: {
    clickHandler() {
      if (this.isFollow) this.unfollow()
      else this.follow()
    },
    followCheck() {
      Api.followCheck(this.idUser, localStorage.getItem('userId')).then(data => {

        const res = data.findIndex(item => item.id === +this.$store.state.auth.userId) !== -1
        console.log(res)
        this.isFollow = res
        this.isLoaded = true
      })
    },
    follow() {
      Api.follow(this.idUser, localStorage.getItem('token')).then(() => {
        this.isFollow = true
        this.$emit('update');
      })
    },
    unfollow() {
      Api.unfollow(this.idUser, localStorage.getItem('token')).then(() => {
        this.isFollow = false
        this.$emit('update');
      })
    }
  }
}
</script>

<style lang="scss" scoped>


button {
  border-radius: 20px;
  border: 1px solid var(--purple-color);
  background: var(--input-bg);
  width: 120px;
  transition: all 0.4s;
}
.active {
  border-color: var(--purple-color);
  color: var(--purple-color);
}
.secondary {
  color:  #c2c2c2;
  border-color:  #c2c2c2;
  &:hover {
    color: red;
    border-color: red;
  }
}
div {
  width: 120px;
  box-sizing: border-box;
  height: 1px;
}
</style>