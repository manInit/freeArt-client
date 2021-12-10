<template>
  <router-link :to="`/user/${id}`" class="top">
    <div class="images">
      <font-awesome-icon
          v-if="place <= 3"
          class="icon trophy"
          :style="{ color: colorTrophy }"
          :icon="['fas', 'trophy']"
      />
      <span class="icon place" v-else>{{ place }}</span>
      <UserAvatar :img-url="imgUrl" />
    </div>
    <div class="points">{{ points }} очков</div>
  </router-link>
</template>

<script>
import UserAvatar from '../user/UserAvatar';

export default {
  name: 'TopUser',
  props: {
    imgUrl: String,
    points: Number,
    place: Number,
    id: Number
  },
  components: {
    UserAvatar,
  },

  computed: {
    colorTrophy() {
      if (this.place === 1) return '#FFCE21';
      if (this.place === 2) return '#C0C0C0';
      return '#B87333';
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  transition: color 0.2s;
  &:hover .points {
    color: var(--active-color);
  }
  &:hover .icon {
    transform: translate(0, -3px);
  }
}
.icon {
  transition: transform 0.2s;
}
.place {
  font-size: 25px;
  color: #868686;
  font-style: italic;
}
.trophy {
  font-weight: 900;
  font-size: 25px;
  filter: drop-shadow(0px 4px 1px rgba(0, 0, 0, 0.35));
}
.points {
  font-weight: 300;
  font-size: 18px;
  color: #868686;
}
.images {
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
