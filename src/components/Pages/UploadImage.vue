<template>
  <div class="container">
    <div class="row mx-3 main-content">
      <div class="mt-5 col-lg-4 col-12">
        <FileInput
            @imageLoad="onImageLoad"
        />
        <div class="form-text text-danger">{{ err.file }}</div>
        <div class="mt-3">
          <label for="title" class="form-label fw-bold">
            Название работы
          </label>
          <input type="text" placeholder="Введите название..." class="form-control" id="title"
                 aria-describedby="titleHelp" v-model="title">
          <div id="titleHelp" class="form-text text-danger">{{ err.title }}</div>
        </div>
        <div class="mt-3">
          <label for="description" class="form-label fw-bold">
            Описание работы
          </label>
          <textarea type="text"
                    class="form-control"
                    id="description"
                    aria-describedby="descHelp"
                    v-model="description"
          ></textarea>
          <div id="descHelp" class="form-text text-danger">{{ err.description }}</div>
        </div>
        <div class="mt-3">
          <label id="tags" class="form-label fw-bold">
            Теги
          </label>
          <select
              id="tags"
              class="form-select"
              aria-label="Default select example"
              multiple=""
              v-model="tagsSelect"
          >
            <option
                v-for="tag in tags"
                :key="tag.id"
                :value="tag.id"
            >{{ tag.tag }}</option>
          </select>
          <div id="tagsHelp" class="form-text text-danger"></div>
        </div>
        <button class="mt-3 mb-3" @click="sendImage">Отправить</button>
      </div>
      <div class="offset-lg-1 col-lg-7 col-12">
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
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import FileInput from '../UI/FileInput'

export default {
  name: 'UploadImage',
  components: {FileInput},
  data() {
    return {
      imgSrc: '',
      isUpload: false,
      tags: null,
      description: '',
      title: '',
      tagsSelect: null,
      err: {
        file: '',
        title: '',
        description: ''
      }
    }
  },
  watch: {
    title(value) {
      this.title = value
      this.validateTitle()
    },
    description(value) {
      this.description = value
      this.validateDescription()
    },
    isUpload(value) {
      this.isUpload = value
      this.validateFile()
    }
  },
  methods: {
    onImageLoad({ src, file }) {
      this.isUpload = src !== ''
      this.imgSrc = src
      this.file = file

      if (this.isUpload) this.err.file = ''
    },
    validateTitle() {
      if (!this.title.trim()) {
        this.err.title = 'Введите название'
        return false
      }

      this.err.title = ''
      return true
    },
    validateDescription() {
      if (this.description.trim().length < 10) {
        this.err.description = 'Описание не меньше 10 символов'
        return false
      }
      this.err.description = ''
      return true
    },
    validateFile() {
      if (!this.isUpload) {
        this.err.file = 'Загрузите картинку'
        return false
      }
      this.err.file = ''
      return true
    },
    validateForm() {
      return (this.validateFile() && this.validateTitle() && this.validateDescription())
    },
    sendImage() {
      if (!this.validateForm()) {
        return
      }

      Api.uploadImage(this.title, this.description, this.tagsSelect, this.file, localStorage.getItem('token'))
        .then(() => {
          this.$router.push('/user/' + this.$store.state.auth.userId + '/moderation')
        }).catch(e => {
          if (e.toString() === 'Error: 400')
            this.err.file = 'Такой файл уже загружен'
          else
            this.err.file = 'Файл слишком большой'
      })
    }
  },
  mounted() {
    Api.getAllTags().then(data => {
      this.tags = data
    })
  }
}
</script>

<style lang="scss" scoped>
input, textarea, select {
  background: var(--input-bg);
  color: var(--contrast-color);
  &:focus {
    background: var(--input-bg);
    box-shadow: none;
    color: var(--contrast-color);
  }
}
label {
  color: var(--contrast-color);
  font-size: 24px;
}
textarea {
  resize: none;
}
span {
  font-size: 20px;
}
.icon {
  font-size: 60px;
}
button {
  border-radius: 20px;
  background: var(--contrast-color);
  color: var(--main-color);
  width: 100%;
  font-weight: bold;
  padding: 10px 0;
}
.caption {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.image {
  background: var(--image-placeholder-bg);
  color: var(--contrast-color);
  position: relative;
  width: 100%;
  height: 100%;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}

@media screen and (max-width: 992px) {
  .main-content {
    flex-direction: column-reverse;
  }
  .image {
    height: 400px;
  }
}
</style>