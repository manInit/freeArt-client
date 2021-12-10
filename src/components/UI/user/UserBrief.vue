<template>
  <router-link
      v-if="userId !== -1" :to="`/user/${userId}`"
      class="user-brief"
  >
    <h4 :class="['user__role', { large: isLarge }]">{{ title }}</h4>
    <div
        class="user__content"
        :title="login"
    >
      <UserAvatar class="avatar" :img-url="imgUrl" :is-large="true" />
      <span
          :class="['user__name', { user_name_lg :isLarge }]"
      >
        @{{ login.length >= countSymbol + 2 ? login.substring(0, countSymbol) + '...' : login  }}
      </span>
    </div>
  </router-link>
</template>

<script>
import UserAvatar from './UserAvatar'

export default {
  name: 'UserBrief',
  props: {
    userId: Number,
    imgUrl: String,
    login: String,
    title: String,
    isLarge: {
      type: Boolean,
      default: false
    },
    countSymbol: {
      type: Number,
      default: 6
    }
  },
  components: {
    UserAvatar,
  },
};
</script>

<style lang="scss" scoped>
* {
  transition: all 0.2s;
}
h4 {
  color: var(--contrast-color);
}
.user-brief:hover {
  h4 {
    color: var(--contrast-color);
  }
  span {
    color: var(--active-color) !important;
  }
}
a:hover {
  color: black;
}
.large {
  font-size: 20px !important;
  font-weight: bold;
  margin-bottom: 5px !important;
}
.user_name_lg {
  font-size: 18px !important;
}
.user__role {
  font-size: 14px;
  margin: 0;
}
.avatar {
  margin-right: 7px;
}
.user__name {
  font-weight: bold;
  font-size: 14px;
}
.user__content {
  display: flex;
  align-items: center;
  padding-right: 10px;
  overflow: hidden;
}
</style>
