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
  margin: 0 auto;
}
button,input{
  font: inherit;
}
.example {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.example::-webkit-scrollbar {
  display: none;
}
body {
  overflow-y: hidden; /* 隐藏垂直滚动条 */
  overflow-x: hidden; /* 隐藏水平滚动条 */
}
</style>
