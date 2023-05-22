<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang='ts'>  
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Types extends Vue {
  type = "-"; //'-'表示支出，'+'表示收入
  selectType(type:string) {
    if (type !== "-" && type !== "+") {//type只能是'-'和'+'中的一个
      throw new Error("type is unknown");
    }
    this.type = type;
  }
}

// export default {
//   name: "Types",
//   data() {
//     return {
//       type: "-",
//     };
//   },
//   methods: {
//     selectType(type) {
//       if (type !== "-" && type !== "+") {
//         throw new Error("type is unknown");
//       }
//       this.type=type
//     },
//   },
// };
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