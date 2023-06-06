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
#app{
  font-family: $font-hei;
  line-height: 1.5;
  color: #333;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;font-size: 16px;
  max-width: 500px;
  margin: 0 auto;
}
button,input{
  font: inherit;
}
</style>
