<template>
  <div class="noResult">
    <Icon name="noResult" />
    <span>暂无数据</span>
    <Button class="button" @click="Jump">记一笔</Button>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
@Component({ components: { Button } })
export default class noResult extends Vue {
  Jump() {
    this.$router.push("/money");
  }
}
</script>

<style lang="scss" scoped>
.noResult {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  > svg {
    width: 80px;
    height: 80px;
    margin-left: 10px;
  }
  > span {
    text-align: center;
    color: rgba(0, 0, 0, 0.25);
    font-size: 12px;
  }
  > .button {
    margin-top: 25px;
  }
}
</style>