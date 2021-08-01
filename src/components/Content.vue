<template>
  <div class="container">{{contentType}}</div>
</template>

<script>
export default {
  name: "Content",
  props: {
    contentType: {
      type: String,
      default: "",
    },
  },
  mounted(){
    console.log(this.contentType)
  }
};
</script>

<style lang="scss" scoped>
</style>