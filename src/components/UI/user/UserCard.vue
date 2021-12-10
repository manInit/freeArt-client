<template>
  <div class="user-card">
    <div class="avatar text-center">
      <UserAvatar
          :img-url="user.avatarUrl"
          :is-x-large="true"
      />
      <font-awesome-icon
          v-if="isEdit"
          class="edit-avatar edit-icon"
          @click="toggleImage"
          :icon="['far', 'edit']" />
    </div>
    <h5 class="fw-bold text-center">@{{ user.login }}</h5>
    <div class="follow mt-2 d-flex flex-wrap ">
      <div @click="openFollowers" class="follows-link">
        <span class="fw-bold">{{ user.countFollowers }}</span>
        <h6>Подписчиков</h6>
      </div>
      <div @click="openFollowed" class="follows-link">
        <span class="fw-bold">{{ user.countFollowing }}</span>
        <h6>Подписок</h6>
      </div>
      <FollowedButton
          @update="$emit('update')"
          v-if="isActiveFollowedBtn"
          :id-user="user.id"
          class="mx-2 mt-1 follow-btn"
      />
      <div v-else class="button-placeholder mx-2">
      </div>
    </div>
    <h6 class="mt-3 about-title">
      О себе
      <font-awesome-icon
          v-if="isEdit"
          @click="toggleInput"
          :class="[isInput && 'edit-icon-active', 'edit-icon']"
          :icon="['far', 'edit']" />
    </h6>
    <div class="about">
      <p v-if="!isInput">
        {{ about }}
      </p>
      <div v-else class="d-flex mb-1">
        <input
            type="text"
            class="edit-input"
            v-model="description"
        >
        <button class="btn-dark" @click="updateDescription">Изменить</button>
      </div>
    </div>
    <div>
      <h5 class="fw-bold">{{ user.points }}</h5>
      <span class="caption">Очков</span>
    </div>
    <div class="mt-2">
      <h5 class="fw-bold">{{ user.collectionCount }}</h5>
      <span class="caption">Работ в коллекции</span>
    </div>
    <div class="mt-2">
      <h5 class="fw-bold">{{ user.worksCount }}</h5>
      <span class="caption">Опубликованных работ</span>
    </div>
    <div class="mt-4 value fw-bold">
      <span>Общая стоимость коллекции</span>
      <h5 class="fw-bold">{{ user.collectionCost }}</h5>
    </div>
  </div>
  <ModalUploadImage
      v-if="isUploadImage"
      @update="update"
      @close="closeModal"
  />
  <ModalFollowers
      v-if="isModalFollow"
      @close="closeFollowerModal"
      :id-user="this.user.id"
      :is-followers="this.modalIsFollower"
  />
</template>

<script>
import UserAvatar from './UserAvatar'
import FollowedButton from '../FollowedButton'
import Api from '@/api'
import ModalUploadImage from '../modals/ModalUploadImage'
import ModalFollowers from '../modals/ModalFollowers'

export default {
  name: 'UserCard',
  props: {
    user: Object
  },
  data() {
    return {
      isInput: false,
      description: this.user.about,
      errMsg: '',
      isUploadImage: false,
      modalIsFollower: false,
      isModalFollow: false,
      about: this.user.about
    }
  },
  components: {
    ModalFollowers,
    ModalUploadImage,
    FollowedButton,
    UserAvatar
  },
  computed: {
    isActiveFollowedBtn() {
      return +this.user.id !== +this.$store.state.auth.userId && this.$store.state.auth.status.loggedIn
    },
    isEdit() {
      return +this.user.id === +this.$store.state.auth.userId
    }
  },
  methods: {
    openFollowed() {
      this.modalIsFollower = false
      this.isModalFollow = true
    },
    openFollowers() {
      this.modalIsFollower = true
      this.isModalFollow = true
    },
    closeFollowerModal() {
      this.isModalFollow = false
    },
    update() {
      this.closeModal()
      this.$emit('update')
    },
    closeModal() {
      this.isUploadImage = false
    },
    updateDescription() {
      if (this.description.trim().length === 0) {
        this.errMsg = 'Пустая строка'
        return
      }

      if (this.description === this.user.about) {
        this.isInput = false
        return
      }

      Api.updateDescription(+localStorage.getItem('userId'),
          this.description.trim(),
          localStorage.getItem('token')).then(data => {


          this.about = data.about
          this.$emit('update')
        this.isInput = false
      })
    },
    toggleInput() {
      this.isInput = !this.isInput
    },
    toggleImage() {
      this.isUploadImage = !this.isUploadImage
    }
  }
}
</script>

<style lang="scss" scoped>


.edit-avatar {
  position: absolute;
  right: 10px;
  bottom: 0;
  color: #868686;
}

.follows-link {
  cursor: pointer;
  transition: color 0.2s;
  margin-right: 5px;
  &:hover, &:hover h6 {
    color: var(--active-color);
  }

}

.edit {
  &-icon {
    font-size: 16px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
      color: var(--active-color);
    }
    &-active {
      color: var(--purple-color);
    }
  }
  &-input {
    font-size: 14px;
    min-width: 100px;
    max-width: 150px;
  }
}
.caption {
  color: var(--user-card-titles);
}
.avatar {
  position: absolute;
  top: -90px;
  left: calc(50% - 75px);
}
.user-card {
  position: relative;
  margin-top: 120px;
  padding: 70px 10px 20px 15px;
  box-shadow: 0 0 10px var(--shadow-color-75);
  word-wrap: break-word;
  background: var(--card-bg);
  color: var(--contrast-color);
}
h6 {
  font-size: 12px;
  color: var(--user-card-mini);
}
.about {
  position: relative;
  line-height: 1.2;
  font-size: 14px;
}
.value {
  text-align: center;
  position: relative;
  &::before {
    content: '';
    width: 200px;
    height: 1px;
    display: block;
    position: absolute;
    background: #AFAFAF;
    top: -10px;
    left: calc(50% - 100px);
  }
}
.button-placeholder {
  width: 40px;
}
.follow-btn {
  margin-left: auto !important;

}
</style>