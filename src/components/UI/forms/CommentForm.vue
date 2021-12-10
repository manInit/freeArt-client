<template>
  <form v-if="isLogin" @submit.prevent="sendComment" @updated="$emit('updated', true)">
    <input
        type="text"
        placeholder="Оставить комметарий"
        v-model="text"
    >
    <button type="submit">Отправить</button>
  </form>
  <div class="form-text mb-3 text-danger text-center">{{ err }}</div>
</template>

<script>
import Api from '@/api'

export default {
  name: 'CommentForm',
  props: {
    auctionId: Number,
  },
  data() {
    return {
      text: '',
      err: '',
      isLogin: this.$store.state.auth.status.loggedIn
    }
  },
  methods: {
    sendComment() {
      if (!this.auctionId) return
      if (this.text.trim().length < 1) {
        this.err = 'Длина комментария должна быть не меньше 1 символа'
        return
      }

      Api.createComment(this.auctionId, this.text.trim(), localStorage.getItem('token')).then(() => {
        this.text = ''
        this.err = ''
        this.$emit('updated')
      })
    }
  }
}
</script>

<style lang="scss" scoped>


input {
  border: none;
  border-bottom: 1px solid var(--active-color);
  background: transparent;
  margin-right: 20px;
  color: var(--contrast-color);
  &:focus-within {
    outline: none;
  }
}
button {
  border: 1px solid var(--active-color);
  color: var(--active-color);
  font-size: 14px;
  border-radius: 20px;
  background: var(--main-color);
}
</style>