<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-sm-8 col-12">
        <div class="input-group mt-5">
          <input type="text" class="form-control"
                 placeholder="Новый тег"
                 v-model="newTag">
          <div class="input-group-append">
            <button
                class="btn btn-primary"
                type="button"
                @click="createTag"
                :disabled="disableButton">Добавить</button>
          </div>
        </div>
      </div>
      <div class="col-12">
        <table class="table mt-3">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Действие</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(tag, index) in tags" :key="tag.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ tag.tag }}</td>
            <td>
              <button @click="deleteTag(tag.id)" class="btn btn-danger">Удалить</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'

export default {
  name: 'TagsForm',
  data() {
    return {
      tags: null,
      newTag: '',
      disableButton: false
    }
  },
  mounted() {
    this.fetchTags()
  },
  methods: {
    deleteTag(id) {
      Api.deleteTag(id, localStorage.getItem('token')).then(() => this.fetchTags())
    },
    createTag() {
      if (!this.newTag.trim()) return

      this.disableButton = true
      Api.createTag(this.newTag.trim(), localStorage.getItem('token')).then(() => {
        this.newTag = ''
        this.disableButton = false
        this.fetchTags()
      })
    },
    fetchTags() {
      Api.getAllTags().then(data => this.tags = data)
    }

  }
}
</script>

<style lang="scss" scoped>
* {
  color: var(--contrast-color);
}
button {
  color: #fff;
  z-index: 1 !important;
  position: relative;
}
input {
  background: var(--input-bg);
  color: var(--contrast-color);
  min-width: 200px;
  &:focus {
   background: var(--input-bg);
   box-shadow: none;
   color: var(--contrast-color);
 }
}
</style>