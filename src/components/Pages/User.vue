<template>
  <div class="container-fluid">
    <div v-if="user !== null" class="row">
      <div class="col-xl-3 col-lg-3 col-md-4 offset-md-0 offset-sm-3 col-sm-6 offset-1 col-10 user-card">
        <UserCard
            @update="fetchUser"
            :user="user"
        />
      </div>
      <div class="card-content content col-8">
        <Tabs :tabs="tabs" />
        <router-view></router-view>
      </div>
    </div>
    <Preload v-else />
    <div v-if="isFail">
      {{ $router.replace('/404') }}
    </div>
  </div>
</template>

<script>
import UserCard from '../UI/user/UserCard'
import Preload from '../UI/Preload'
import Api from '@/api'
import Tabs from '../UI/tabs/Tabs'

export default {
  name: 'User',
  components: {
    Tabs,
    UserCard,
    Preload,
  },
  data() {
    return {
      user: null,
      isFail: false
    }
  },
  computed: {
    tabs() {
      const id = this.user.id

      const privateTabs = +id === +this.$store.state.auth.userId ?
          [ { title: 'Мое участие в аукционах', link: `/user/${id}/auctions/participate`},
            { title: 'На модерации', link: `/user/${id}/moderation` }] :
          [];

      return [
        { title: 'Аукционы', link: `/user/${id}/auctions`},
        { title: 'Коллекция', link: `/user/${id}`},
        ...privateTabs
      ]
    }
  },
  watch: {
    $route(to, from) {
      const idTo = to.params.id
      const idFrom = from.params.id
      if(idTo && idFrom && idFrom !== idTo)
        location.reload();
    }
  },
  methods: {
    fetchUser() {
      const userId = this.$route.params.id
      Api.getUser(userId).then(data => {
        this.user = data
      }).catch(e => {
        this.isFail = true
      })
    }
  },
  mounted() {
    this.fetchUser()
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .content {
    margin-top: 0 !important;
  }
  .card-content {
    width: 100%;
  }
  .user-card {
    margin-bottom: 40px;
  }
}
.content {
  margin-top: 120px;
}

</style>