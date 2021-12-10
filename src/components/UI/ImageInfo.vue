<template>
  <ul class="user-list d-flex">
    <li>
      <UserBrief
          :img-url="image.creator.avatarUrl"
          :login="image.creator.login"
          title="Автор"
          :is-large="true"
          :user-id="image.creator.id"
      />
    </li>
    <li>
      <UserBrief
          :img-url="image.owner.avatarUrl"
          :login="image.owner.login"
          :user-id="image.owner.id"
          title="Владелец"
          :is-large="true"
      />
    </li>
  </ul>
  <div class="description mt-3">
    <h3 class="mt-2 fw-bold">{{ image.title }}</h3>
  </div>
  <div class="description mt-3">
    <h4 class="fw-bold">Описание</h4>
    <p class="mt-2">{{ image.description }}</p>
  </div>
  <div
      v-if="image.tags.length !== 0"
      class="tags mt-3"
  >
    <h4 class="fw-bold">Теги</h4>
    <ul class="tags-list d-flex flex-wrap mt-1">
      <li
          v-for="tag in image.tags"
          :key="tag.id"  class="mt-3">
        <Tag :title="tag.tag"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Tag from './Tag'
import UserBrief from './user/UserBrief'

export default {
  name: 'ImageInfo',
  components: {UserBrief, Tag},
  props: {
    image: null
  }
}
</script>

<style lang="scss" scoped>
* {
  color: var(--contrast-color);
}

.user-list li {
  margin-right: 30px;
}

.tags-list li {
  margin-right: 10px;
}
</style>