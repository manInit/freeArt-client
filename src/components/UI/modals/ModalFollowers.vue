<template>
  <div class="modal d-block text-center">
    <div class="mx-3">
      <h4 class="text-center mb-3">{{ isFollowers ? 'Подписчики' : 'Подписки' }}</h4>
      <h5 class="empty text-center mt-5" v-if="dataUsers.length === 0 && isUpload">
        Здесь пусто
      </h5>
      <ul v-if="isUpload" class="d-flex flex-row flex-wrap">
        <li v-for="user in dataUsers" :key="user.id" class="user-link">
          <router-link class="d-flex align-items-center" :to="`/user/${user.id}`">
            <UserAvatar :img-url="user.avatarUrl" is-large class="flex-shrink-0"/>
            <h5 class="mx-2">
              @{{ user.login.length >= 8 ? user.login.substring(0, 6) + '...' : user.login  }}
            </h5>
          </router-link>
        </li>
      </ul>
      <Preload v-else />
    </div>
  </div>

  <div @click="$emit('close')" class="modal_wrap"></div>
</template>

<script>
import Api from '@/api'
import UserAvatar from '../user/UserAvatar'
import Preload from '../Preload'

export default {
  name: 'ModalFollowers',
  components: {Preload, UserAvatar},
  props: {
    isFollowers: {
      type: Boolean,
      default: false
    },
    idUser: Number
  },
  data() {
    return {
      dataUsers: [],
      isUpload: false
    }
  },
  mounted() {
    this.updateData()
  },
  methods: {
    updateData() {
      this.isUpload = false
      if (this.isFollowers) this.fetchFollowers()
      else this.fetchFollowed()
    },
    fetchFollowers() {
      Api.getFollowers(this.idUser).then(data => {
        this.dataUsers = data
        this.isUpload = true
      })
    },
    fetchFollowed() {
      Api.getFollowing(this.idUser).then(data => {
        this.dataUsers = data
        this.isUpload = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-link {
  width: 45%;
  margin-right: 10px;
  margin-bottom: 5px;
  &:nth-child(2n) {
    margin-right: 0;
  }
}
.modal {
  width: 400px;
  max-height: 500px;
  overflow: auto;
  position: fixed;
  z-index: 12;
  left: calc(50vw - 200px);
  top: calc(50vh - 250px);
  background: var(--main-color);
  color: var(--contrast-color);
  padding: 10px;
}
.modal_wrap {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.4;
  background: #000;
  z-index: 10;
}

@media screen and (max-width: 768px){
  .modal {
    width: 300px;
    height: 420px;
    left: calc(50vw - 150px);
    top: calc(50vh - 210px);
  }
  .user-link {
    width: 100%;
  }
}
</style>