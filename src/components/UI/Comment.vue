<template>
  <li class="comment d-flex position-relative">
    <router-link :to="`/user/${comment.user.id}`">
      <UserAvatar class="mx-3" :img-url="comment.user.avatarUrl" />
    </router-link>

    <div class="content">
      <div class="comment-meta d-flex align-items-end">
        <router-link :to="`/user/${comment.user.id}`">
          <h5 class="fw-bold">@{{ comment.user.login }}</h5>
        </router-link>
        <span class="mx-2 date">{{ date }}</span>
      </div>
      <p class="mt-1">
        {{ comment.content }}
      </p>
    </div>
    <div v-if="isDelete">
      <font-awesome-icon class="delete" @click="$emit('delete', comment.id)" :icon="['far', 'trash-alt']" />
    </div>
  </li>
</template>

<script>
import UserAvatar from './user/UserAvatar'
import formatDate from '../../utils/formatDate'

export default {
  name: 'Comment',
  components: {
    UserAvatar
  },
  props: {
    comment: Object
  },
  computed: {
    isDelete() {
      return this.comment.user.id === +this.$store.state.auth.userId
    },
    date() {
      return formatDate(this.comment.date)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  color: var(--contrast-color);
}

.date {
  color: var(--date-color);
  font-size: 14px;
}
h5 {
  transition: color 0.2s;
}
.delete {
  color: red;
  cursor: pointer;
  position: absolute;
  display: none;
  transition: color 0.2s;
  &:hover {
    color: var(--delete-bg);
  }
}
.comment:hover .delete {
  display: block;
}
</style>