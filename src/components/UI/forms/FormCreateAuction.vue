<template>
  <div class="create-auction">
    <h4>Выставить на аукцион</h4>
    <p>
      Задайте минимальное значение ставки. После того, как один из пользователей сделает ставку начнется
      24-х часовой аукцион. Картина уходит тому, кто сделает большую ставку за все это время
    </p>
    <FormInputWithButton
        @send="createAuction"
        @valUpdate="inputUpdate"
        placeholder="Ваша цена"
        button-text="Начать аукцион"/>
  </div>
</template>

<script>
import Api from '@/api'
import FormInputWithButton from './FormInputWithButton'

export default {
  name: 'FormCreateAuction',
  components: {
    FormInputWithButton
  },
  props: {
    idImage: Number
  },
  data() {
    return {
      bidInput: ''
    }
  },
  methods: {
    inputUpdate(val) {
      this.bidInput = val
    },
    createAuction() {
      if (this.bidInput.match(/\D+/)) return

      Api.createAuction(this.idImage, this.bidInput, localStorage.getItem('token')).then(data => {
        if (data.err) return

        this.$router.replace('/auction/' + data.id)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  color: var(--contrast-color);
}

.create-auction {
  box-shadow: 0 0 10px var(--shadow-color-50);
  padding-bottom: 20px;
  background: var(--header-bg);
  h4 {
    font-size: 20px;
    color: #fff;
    background: var(--purple-color);
    text-align: center;
    padding: 12px 0;
  }
  p {
    padding: 10px 20px;
    line-height: 1.2;
  }
}
</style>