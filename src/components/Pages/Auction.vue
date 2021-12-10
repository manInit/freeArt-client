<template>
  <div>
    <div v-if="auction !== null" class="container">
      <div class="row">
        <ImageViewer class="col" :img-url="auction.image.url"  />
      </div>
      <div class="row mt-4 mb-5">
        <div class="col-md-6">
          <ImageInfo :image="auction.image" />
          <div class="mt-4">
            <h4 class="fw-bold">Комментарии аукциона</h4>
            <ul class="comments mt-3">
              <CommentForm @updated="fetchAuction" class="mb-3" :auction-id="auction.id" />
              <Comment v-for="comment in auction.comments"
                :key="comment.id"
                :comment="comment"
                @delete="deleteComment"
              />
            </ul>
          </div>
        </div>
        <div class="offset-md-1 offset-0  col-md-5 px-0">
          <div class="bids pb-4">
            <div class="bids-header p-2 d-flex">
              <div class="d-flex flex-column flex-grow-1">
                <span>Текущая цена:</span>
                <span class="value">{{ auction.price }}</span>
              </div>
              <div class="d-flex flex-column flex-grow-1">
                <span>{{ timeText }}</span>
                <span class="value">
                  <Timer v-if="auction !== null"
                         :time-zone="'UTC'"
                         :end-date="auction.endDate"
                         @timeEnd="onTimeEnd"
                  />
                </span>
              </div>
            </div>
            <div class="bids-content">
              <FormInputWithButton
                  v-if="isLogin && !isOwner"
                  class="mt-2"
                  placeholder="Ваша цена"
                  :error="errBid"
                  button-text="Сделать ставку"
                  @valUpdate="inputUpdate"
                  @send="sendBid"
                  ref="formInput"
              />
              <h4 class="mt-4 fw-bold text-center">История ставок</h4>
              <ul class="mt-3">
                <Bid
                    v-for="(bid, index) in auction.bids"
                    :key="bid.id"
                    :bid="bid"
                    :is-first="index === auction.bids.length - 1"
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Preload v-else />
    <div v-if="isFail">
      {{ $router.replace('/404') }}
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import ImageViewer from '../UI/ImageViewer'
import Preload from '../UI/Preload'
import ImageInfo from '../UI/ImageInfo'
import Comment from '../UI/Comment'
import CommentForm from '../UI/forms/CommentForm'
import FormInputWithButton from '../UI/forms/FormInputWithButton'
import Bid from '../UI/Bid'
import Timer from '../UI/Timer'


export default {
  name: 'Auction',
  components: {
    Timer,
    Bid,
    FormInputWithButton,
    CommentForm,
    Comment,
    ImageInfo,
    Preload,
    ImageViewer,
  },
  methods: {
    onTimeEnd() {
      setTimeout(() => {
        //по окончанию перенаправление на победителя
        Api.getImage(this.auction.image.id).then(data => {
          const idOwner = data.owner.id
          this.timeText = 'Архив'
          this.$router.push('/user/' + idOwner)
        })
      }, 200)
    },
    sendBid() {
      if (this.bidInput.match(/\D+/)) return

      Api.makeBid(this.auction.id, this.bidInput, localStorage.getItem('token')).then(data => {
        this.$refs.formInput.reset()
        this.errBid = ''
        this.fetchAuction()
      }).catch(e => {

        if (this.auction.bids.sort((a, b) => a.price > b.price)[0]['price'] >= this.bidInput)
          this.errBid = 'Вы должны сделать ставку больше максимальной'
        else
          this.errBid = 'У вас нет средств сделать такую ставку'
      })
    },
    inputUpdate(val) {
      this.bidInput = val
    },
    fetchAuction() {
      let idAuction = this.$route.params.id
      Api.getAuction(idAuction).then(data => {
        if (data.buyer !== null) this.isFail = true

        this.auction = data
        this.isOwner = +this.$store.state.auth.userId === this.auction.image.owner.id
      }).catch(e => {
        this.isFail = true
      })
    },
    deleteComment(id) {
      const token = localStorage.getItem('token')
      Api.deleteComment(id, token).then(() => {
        this.fetchAuction()
      })
    }
  },
  mounted() {
    this.isLogin = this.$store.state.auth.status.loggedIn;
    this.fetchAuction()
  },
  data() {
    return {
      auction: null,
      timeToEnd: null,
      isFail: false,
      isLogin: false,
      bidInput: '',
      isOwner: false,
      errBid: '',
      endData: '',
      timeText: 'Осталось времени:'
    }
  }
}
</script>

<style lang="scss" scoped>
.bids-content {
  color: var(--contrast-color);
}
.bids{
  box-shadow: 0 0 10px var(--shadow-color-50);
  background: var(--header-bg);
  &-header {
    background: var(--purple-color);
    color: #fff;
    & .value {
      font-size: 20px;
    }
  }
}
h4 {
  color: var(--contrast-color);
}
</style>