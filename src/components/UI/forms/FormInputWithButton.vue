<template>
  <div class="mt-3 text-center">
    <div class="inputs">
      <input
          type="text"
          :placeholder="placeholder"
          v-model="value"
          @keypress="isDigit"
      >
      <button @click="$emit('send')">{{ buttonText }}</button>
    </div>
    <div class="form-text text-danger">{{ error }}</div>
  </div>

</template>

<script>
export default {
  name: 'FormInputWithButton',
  props: {
    placeholder: String,
    buttonText: String,
    error: String
  },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    value(val) {
      this.value = val
      this.$emit('valUpdate', val)
    }
  },
  methods: {
    isDigit(e) {
      let char = String.fromCharCode(e.keyCode);

      if(/^\d+$/.test(char)) return true;
      else e.preventDefault();
    },
    reset() {
      this.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>


.inputs {
  display: flex;
  justify-content: center;
  input {

    width: 100px;
  }
  button {
    display: block;
    color: var(--main-color);
    background: var(--contrast-color);
    padding: 0 15px;
    border: none;
  }
}
</style>