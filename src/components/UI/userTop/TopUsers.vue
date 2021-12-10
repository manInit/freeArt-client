<template>
  <div class="container mt-5">
    <h2>
      Топ пользователей
      <div class="description">
        <font-awesome-icon
          class="questions"
          :icon="['far', 'question-circle']"
        />
        <p class="question-text p-2">
          Топ составляется по общей стоимости коллекции пользователей. То есть
          общей стоимости всех купленных им работ и находящихся у него в
          коллекции
        </p>
      </div>
    </h2>
    <ul class="d-flex align-items-center flex-wrap top-list justify-content-center">
      <li v-for="user in topUsers" :key="user.id">
        <TopUser
          :img-url="user.avatarUrl"
          :points="user.collectionCost"
          :place="user.place"
          :id="+user.id"
          :title="user.login"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import TopUser from './TopUser';
import Api from '@/api';

export default {
  name: 'TopUsers',
  components: {
    TopUser,
  },
  mounted() {
    Api.getTopUsers().then(data => {
      data = data.filter(user => user.collectionCost !== 0)

      this.topUsers = data

    })
  },
  data() {
    return {
      topUsers: null,
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: var(--contrast-color);
}
.top-list {
  padding-top: 5px;
  margin: 5px auto 0 auto;
  padding-left: 15px;
  box-shadow: 0 0 10px 1px var(--shadow-color-50);
  border-radius: 5px;
  background: var(--header-bg);
  max-width: 700px;
  min-height: 72px;
  box-sizing: border-box;
  li {
    margin-right: 20px;
    position: relative;
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      top: calc(50% - 25px);
      right: -10px;
      display: block;
      width: 2px;
      height: 50px;
      background: var(--gray-color);
    }
  }
}
.questions {
  color: var(--question-color);
  font-size: 16px;
}
.description {
  display: inline-block;
  position: relative;
  p {
    position: absolute;
    font-weight: normal;
    font-size: 14px;
    text-align: left;
    width: 300px;
    background: var(--main-color);
    text-transform: none;
    box-shadow: 0 4px 4px 2px var(--shadow-color-25);
    display: none;
    z-index: 99999;
  }

  &:hover p {
    display: block;
  }
}

@media screen and (max-width: 768px){
  ul {
    flex-direction: column !important;
    justify-content: start !important;
    max-height: 200px;
  }
  li {
    &:not(:last-child)::after {
      display: none !important;
    }
  }
  .description p {
    right: 0;
  }
}
@media screen and (max-width: 576px){
  ul {
    max-height: 1000px !important;
  }
}
</style>
