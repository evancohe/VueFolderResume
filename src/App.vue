<template>
  <div id="app">
    <Enter />
  </div>
</template>

<script>
import Enter from "@/views/Enter";
export default {
  components: {
    Enter,
  },
};
</script>

<style lang="scss">
html {
  background-size: 15px 15px;
  background-image: linear-gradient(to right, #fff 1px, transparent 1px),
    linear-gradient(to bottom, #fff 1px, #eeeeee 1px);
}
#app {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
   font-family: Times, "Times New Roman", Georgia, serif;
  // font-family: sans-serif, monospace, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
