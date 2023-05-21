<template>
  <div>
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.types {
  background: #e8e8e8;
  font-size: 20px;
  display: flex;
  justify-content: center;
  > li {
    margin: 0 16px;
    height: 44px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #333;
    }
  }
}
</style>