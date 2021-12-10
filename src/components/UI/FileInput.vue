<template>
  <input
      class="form-control mt-4"
      type="file"
      id="formFile"
      accept="image/png, image/gif, image/jpeg, image/jpg"
      ref="file"
      @change="uploadImage"
  >
</template>

<script>
export default {
  name: 'FileInput',
  data() {
    return {
      isUpload: false,
      imgSrc: ''
    }
  },
  methods: {
    uploadImage() {
      const allowExt = ['png', 'gif', 'jpeg', 'jpg']

      const el = this.$refs.file
      const filePath = el.value
      if (el.value === '') return

      const ext = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();

      if (!allowExt.includes(ext)) {
        this.isUpload = false
        this.imgSrc = ''
        el.value = ''
        return
      }

      const reader = new FileReader();
      reader.onload = e => {
        this.isUpload = true
        this.imgSrc = e.target.result
        this.$emit('imageLoad', {
          src: this.imgSrc,
          file: el.files[0]
        })
      }

      reader.readAsDataURL(el.files[0]);
    }
  },
  unmounted() {
    this.$emit('imageLoad', { src: '', file: null })
  }
}
</script>

<style scoped>

</style>