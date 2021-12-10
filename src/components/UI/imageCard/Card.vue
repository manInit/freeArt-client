<template>
  <div :class="['card-image', link ? 'card-active' : '']">
    <router-link :to="link" v-if="link !== false">
      <div class="image">
        <img :src="url" alt="картинка" />
      </div>
      <div class="info">
        <h3 class="title">{{ title }}</h3>
        <ul class="users">
          <li class="user">
              <UserBrief
                  :img-url="userAuthor.avatarUrl"
                  :login="userAuthor.login"
                  title="Автор"
                  :userId="+userAuthor.id || -1"
              />
          </li>
          <li class="user">
              <UserBrief
                  :img-url="userOwner.avatarUrl"
                  :login="userOwner.login"
                  title="Владелец"
                  :userId="+userOwner.id || -1"
              />
          </li>
        </ul>
      </div>
      <CardFooter :info="footerInfo" />
    </router-link>
    <div v-else>
      <div class="image">
        <img :src="url" alt="картинка" />
      </div>
      <div class="info">
        <h3 class="title">{{ title }}</h3>
        <ul class="users">
          <li class="user">
            <UserBrief
                :img-url="userAuthor.avatarUrl"
                :login="userAuthor.login"
                title="Автор"
                :userId="+userAuthor.id || -1"
            />
          </li>
          <li class="user">
            <UserBrief
                :img-url="userOwner.avatarUrl"
                :login="userOwner.login"
                title="Владелец"
                :userId="+userOwner.id || -1"
            />
          </li>
        </ul>
      </div>
      <CardFooter :info="footerInfo" />
    </div>
  </div>
</template>

<script>
import UserBrief from '../user/UserBrief'
import CardFooter from './CardFooter'
import Api from '@/api/api'

export default {
  name: 'Card',
  props: {
    imgUrl: String,
    title: String,
    userAuthor: Object,
    userOwner: Object,
    footerInfo: Object,
    link: String
  },
  components: {
    UserBrief,
    CardFooter,
  },
  computed: {
    url() {
      return Api.imageUrl + this.imgUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.card-active {
  &:hover {
    transform: translate(0, -5px);
  }
}

.card-image {
  width: 100%;
  max-width: 360px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  //overflow-x: hidden;
  box-shadow: 0 4px 4px var(--shadow-color-25);
  background: var(--card-bg);
  transition: transform 0.3s;
  transform: translate(0, 0);

  .image {
    width: 100%;
    height: 260px;
  }
  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .info {
    margin: 5px 10px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--contrast-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
a:hover {
  color: var(--contrast-color);
}
.users {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
</style>
