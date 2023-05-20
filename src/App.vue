<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang='ts'>
export default {
  
}
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
body{
  font-family: $font-hei;
  line-height: 1.5;
  color: #333;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}
</style>
