<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" />
      记账
    </router-link>
    <router-link to="/details" class="item" active-class="selected">
      <Icon name="Details" />
      明细
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />
      图表
    </router-link>
  </nav>
</template>

<script lang='ts'>
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  > .item {
    padding: 2px 0;
    width: 33.3333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    color: $color-highlight;
  }
  >a{
    font-size: 12px;
    color: #333;
  }
}
</style>