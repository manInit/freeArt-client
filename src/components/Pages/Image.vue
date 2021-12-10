<template>
  <div>
    <div v-if="image !== null" class="container">
      <div class="row">
        <ImageViewer class="col" :img-url="image.url"  />
      </div>
      <div class="row mt-4 mb-5">
        <div class="col-md-6 col-12">
          <ImageInfo :image="image" />
        </div>
        <div class="create-auction offset-md-2 col-md-4 offset-0 col-12 px-0">
          <FormCreateAuction v-if="isOwner && image['isActivated']" :id-image="image.id"  />
          <div class="moderation" v-if="isAdmin && !image['isActivated']">
            <button @click="setValid" class="btn btn-success mx-2">Опубликовать</button>
            <button @click="deleteInvalid" class="btn btn-danger">Отменить</button>
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
import FormCreateAuction from '../UI/forms/FormCreateAuction'
import ImageInfo from '../UI/ImageInfo'

export default {
  name: 'Image',
  components: {
    ImageInfo,
    FormCreateAuction,
    Preload,
    ImageViewer,
  },
  mounted() {
    let idImage = this.$route.params.id

    if (this.isAdmin)
      this.getModerationImage(idImage)
    else
      this.getImage(idImage)
  },
  methods: {
    deleteInvalid() {
      let idImage = this.$route.params.id
      Api.deleteImage(idImage, localStorage.getItem('token')).then(data => {
        this.nextModerationStep()
      })
    },
    setValid() {
      let idImage = this.$route.params.id

      Api.setValid(idImage, localStorage.getItem('token')).then(data => {
       this.nextModerationStep()
      })
    },
    nextModerationStep() {
      const idList = JSON.parse(localStorage.getItem('moderation-list'))
      idList.splice(idList.indexOf(+this.$route.params.id), 1)

      console.log(idList.length)

      if (idList.length === 0) {
        localStorage.setItem('moderation-list', null)
        this.$router.replace('/moderation/')
        location.replace('/moderation/')
        return
      }

      const idNext = idList[idList.length - 1]

      localStorage.setItem('moderation-list', JSON.stringify(idList))

      this.$router.replace('/image/' + idNext)
      location.replace('/image/' + idNext)
    },
    getImage(idImage) {
      Api.getImage(idImage).then(data => {
        this.image = data
      }).catch(e => {
        this.isFail = true
      })
    },
    getModerationImage(idImage) {
      Api.getModerationImage(idImage, localStorage.getItem('token')).then(data => {
        this.image = data
      }).catch(e => {
        this.isFail = true
      })
    }
  },
  computed: {
    isOwner() {
      return +this.image.owner.id === +this.$store.state.auth.userId
    },
    isAdmin() {
      return this.$store.state.auth.userRole === 'ADMIN'
    }
  },
  data() {
    return {
      image: null,
      isFail: false
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .create-auction {
    margin-top: 30px;
  }
}
</style>