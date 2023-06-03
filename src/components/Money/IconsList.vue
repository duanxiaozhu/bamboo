<template>
  <div>
    <p>图标</p>
    <div class="tags">
      <ul class="current">
        <li
          v-for="(tag, index) in iconList"
          :key="index"
          :class="{ selected: selectedIcon[0] === tag }"
          @click="toggle(tag)"
        >
          <Icon :name="tag" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import iconsList from "@/constants/customTagList";
@Component
export default class iconList extends Vue {
  iconList = iconsList;
  selectedIcon: string[] = ["dog"];
  toggle(tag: string) {
    const length = this.selectedIcon.length;
    if (length >= 1) {
      this.selectedIcon.splice(0);
      this.selectedIcon.push(tag);
    }
    this.$emit("update:value", this.selectedIcon[0]);
  }
}
</script>

<style lang="scss" scoped>
P {
  padding: 10px 20px;
  font-weight: bold;
}
.tags {
  font-size: 14px;
  margin: 0 16px;
  flex-grow: 1;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      display: flex;
      flex-direction: column;
      width: 25%;
      padding: 16px;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      &.selected {
        color: red;
        svg {
          animation: shake 0.3s linear;
        }
      }
      .icon {
        width: 28px;
        height: 28px;
      }
      @keyframes shake {
        0% {
          transform: rotate(0deg);
        }
        20% {
          transform: rotate(20deg);
        }
        40% {
          transform: rotate(0deg);
        }
        80% {
          transform: rotate(-20deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
    }
  }
}
</style>