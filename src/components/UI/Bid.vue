<template>
  <li class="comment d-flex mb-1">
    <router-link :to="`/user/${bid.user.id}`">
      <UserAvatar class="mx-3" :img-url="bid.user.avatarUrl" />
    </router-link>

    <div class="content">
      <div class="comment-meta d-flex align-items-end">
        <router-link :to="`/user/${bid.user.id}`">
          <h6 class="fw-bold">@{{ bid.user.login }}</h6>
        </router-link>
        <span class="mx-2 date">{{ date }}</span>
      </div>

      <p class="m-0 p-0">{{ isFirst ? 'Начинает аукцион' : 'Делает ставку' }}</p>
      <p class="fw-bold">
        Цена <span>{{ bid.price }}</span>
      </p>
    </div>
  </li>
</template>

<script>
import UserAvatar from './user/UserAvatar'
import formatDate from '../../utils/formatDate'


export default {
  name: 'Bid',
  props: {
    bid: Object,
    isFirst: {
      type: Boolean,
      default: false
    }
  },
  components: {
    UserAvatar
  },
  computed: {
    date() {
      return formatDate(this.bid.date)
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  font-size: 12px;
}
</style>