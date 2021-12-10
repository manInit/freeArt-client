<template>
  <div class="modal d-flex mx-auto text-center">
    <div class="mx-3">
      <h4>Редактирование аватарки</h4>
      <FileInput
        @imageLoad="onImageLoad"
        class="file-input"
      />
      <button class="btn-dark mt-4" @click="sendImage">Отправить</button>
    </div>

    <div class="image d-flex justify-content-center align-items-center">
      <div v-if="!isUpload" class="caption">
        <div class="icon">
          <font-awesome-icon class="icon" :icon="['far', 'id-badge']" />
        </div>
        <span>Здесь появится загруженная картинка</span>
      </div>
      <img v-else :src="imgSrc">
   </div>
  </div>
  <div @click="$emit('close')" class="modal_wrap"></div>
</template>

<script>
import Api from '@/api'
import FileInput from '../FileInput'

export default {
  name: 'ModalUploadImage',
  components: {FileInput},
  data() {
    return {
      isUpload: false,
      imgSrc: '',
      file: null
    }
  },
  methods: {
    onImageLoad({ src, file }) {
      this.isUpload = src !== ''
      this.imgSrc = src
      this.file = file
    },
    sendImage() {
      if (!this.isUpload) return

      Api.uploadAvatar(this.file, localStorage.getItem('token')).then(() => {
        this.$emit('update')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  color: var(--contrast-color);
}
input {
  background: var(--input-bg);
  color: var(--contrast-color);
  &:focus {
    background: var(--input-bg);
    color: var(--contrast-color);
  }
}
.modal {
  width: 600px;
  height: 350px;
  position: fixed;
  z-index: 2;
  left: calc(50vw - 300px);
  top: calc(50vh - 175px);
  background: var(--main-color);
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
  z-index: 1;
}
.file-input {
  width: 250px;
}
button {
  border-radius: 20px;
  background: var(--contrast-color);
  color: var(--main-color);
  width: 150px;
  font-weight: bold;
  padding: 10px 0;
}
.icon {
  color: #fff;
}
span {
  color: #fff;
  font-size: 14px;
}
.caption {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.image {
  background: #4D4D4D;
  position: relative;
  width: 100%;
  background: var(--image-placeholder-bg);
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.icon {
  font-size: 40px;
}

@media screen and (max-width: 768px){
  .modal {
    flex-direction: column !important;
    width: 300px;
    height: 420px;
    left: calc(50vw - 150px);
    top: calc(50vh - 210px);
  }
  button {
    margin-bottom: 20px;
  }
  .caption {
    margin: 50px 0;
  }
}
</style>