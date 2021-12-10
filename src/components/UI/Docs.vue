<template>
  <div class="container">
    <div class="row mt-5 justify-content-center">
      <div class="card mx-3">
        <div class="card-header">
          Отчет #1
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title flex-grow-1">История обменов очками между пользователями</h5>
          <button @click="fetchTransaction" class="btn btn-primary"
            :disabled="docs === 'transact'"
            >Показать</button>
        </div>
      </div>
      <div class="card mx-3">
        <div class="card-header">
          Отчет #2
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title flex-grow-1">Пользователи сортированные по общей стоимости их галлереи</h5>
          <button @click="fetchUserRating" class="btn btn-primary"
            :disabled="docs === 'rating'">Показать</button>
        </div>
      </div>
      <div class="card mx-3">
        <div class="card-header">
          Отчет #3
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title flex-grow-1">Картинки с самыми длинными историями продаж</h5>
          <p class="card-text"></p>
          <button @click="fetchHistory" class="btn btn-primary"
            :disabled="docs === 'history'">Показать</button>
        </div>
      </div>
    </div>
    <h1  id="tableDocs"  class="mt-3 text-center">Отчет</h1>
    <div class="row mt-5 root-table">
      <table class="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th
                v-for="title in titles"
                :key="title.field"
            >
              <SortIcon
                  v-if="title.field"
                  @sortClick="sortData(title.field)"
              />
              {{ title.text }}
            </th>
          </tr>
        </thead>
        <tbody v-if="docs === 'rating'">
          <tr v-for="(item, index) in dataTable" :key="docs + item.id">
            <th>{{ index + 1 }}</th>
            <td>{{ item.collectionPrice }}</td>
            <td>
              <UserBrief
                  :user-id="item.id"
                  :img-url="item.avatarUrl"
                  :login="item.login"
                  :title="''"
                  :count-symbol="16"
              />
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="docs === 'transact'">
          <tr v-for="(item, index) in dataTable" :key="docs + item.id">
            <th>{{ index + 1 }}</th>
            <td>{{ item.price }}</td>
            <td>{{ formDate(item.endDate) }}</td>
            <td>
              <UserBrief
                  :user-id="item.buyer.id"
                  :img-url="item.buyer.avatarUrl"
                  :login="item.buyer.login"
                  :title="''"
                  :count-symbol="16"
              />
            </td>
            <td>
              <UserBrief
                  :user-id="item.seller.id"
                  :img-url="item.seller.avatarUrl"
                  :login="item.seller.login"
                  :title="''"
                  :count-symbol="16"
              />
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="docs === 'history'">
        <tr v-for="(item, index) in dataTable" :key="docs + item.id">
          <th>{{ index + 1 }}</th>
          <td class="text-center">{{ item.auctionCount }}</td>
          <td>{{ item.title }}</td>
          <td class="text-center">
            <router-link :to="'/image/' + item.id">
              <img class="image" :src="getUrlImage(item.url)" :alt="item.title">
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import ApiRoot from '@/api/api'
import UserBrief from './user/UserBrief'
import formatDate from '../../utils/formatDate'
import SortIcon from './sortIcon/SortIcon'

export default {
  name: 'Docs',
  components: {
    SortIcon,
    UserBrief
  },
  data() {
    return {
      titles: null,
      dataTable: null,
      docs: null,
      isAsc: true
    }
  },
  mounted() {
    this.docs = localStorage.getItem('docs-tabs') ?? 'transact'
    this.update()
  },
  methods: {
    formDate(date) {
      return formatDate(date)
    },
    scrollToTable() {
      const container = document.querySelector('#tableDocs').getBoundingClientRect()
      window.scrollTo({top: container.top + window.pageYOffset, behavior: 'smooth'})
    },
    getUrlImage(url) {
      return ApiRoot.imageUrl + url
    },
    sortData(title) {
      if (!title) return

      this.isAsc = !this.isAsc
      this.dataTable = this.dataTable.sort((a, b) => {
        if (Array.isArray(title)) {
          for (let field of title) {
            a = a[field]
            b = b[field]
          }
        } else {
          a = a[title]
          b = b[title]
        }

        if (this.isAsc)
          return a > b ? 1 : -1
        else
          return a < b ? 1 : -1
      })
    },
    update() {
      if (this.docs === 'rating') this.fetchUserRating()
      else if (this.docs === 'transact') this.fetchTransaction()
      else this.fetchHistory()
    },
    fetchUserRating() {
      this.titles = [
          {
            text: 'Стоимость галлереи',
            field: 'collectionPrice'
          },
          {
            text: 'Страница пользователя',
            field: 'login'
          }
      ]
      Api.getUsersRating(localStorage.getItem('token')).then(data => {
        this.docs = 'rating'
        this.dataTable = data
        localStorage.setItem('docs-tabs', this.docs)
        this.scrollToTable()
      })
    },
    fetchTransaction() {
      this.titles = [
        {
          text: 'Количество очков',
          field: 'price'
        },
        {
          text: 'Дата',
          field: 'endDate'
        },
        {
          text: 'Покупатель',
          field: ['buyer', 'login']
        },
        {
          text: 'Продавец',
          field: ['seller', 'login']
        }
      ]
      Api.getTransaction(localStorage.getItem('token')).then(data => {
        this.docs = 'transact'
        this.dataTable = data.reverse()
        localStorage.setItem('docs-tabs', this.docs)
        this.scrollToTable()
      })
    },
    fetchHistory() {
      this.titles = [
        {
          text: 'Количество аукционов',
          field: 'auctionCount'
        },
        {
          text: 'Название',
          field: 'title'
        },
        {
          text: 'Картина',
          field: null
        }
      ]

      Api.getImageHistory(localStorage.getItem('token')).then(data => {
        this.docs = 'history'
        this.dataTable = data.reverse()
        localStorage.setItem('docs-tabs', this.docs)
        this.scrollToTable()
      })
    }
  }
}
</script>

<style scoped>
.card {
  width: 250px;
  margin-bottom: 30px;
  color: var(--contrast-color);
  background: var(--card-bg);
}
*:not(button) {
  color: var(--contrast-color);
}
.image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.root-table {
  max-width: 95vw;
  overflow-x: auto;
}
</style>