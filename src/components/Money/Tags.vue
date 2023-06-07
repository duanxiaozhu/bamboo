<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="(tag, index) in tagList"
        :key="index"
        :class="{ selected: selectedTags[0].value === tag.value }"
        @click="toggle(tag)"
      >
        <span class="icons"><Icon :name="tag.name" /></span>
        <span>{{ tag.value }}</span>
      </li>
      <li @click="edit">
        <span class="icons"><Icon name="edit" /></span>
        <span>编辑</span>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Tags extends Vue {
  @Prop() type!: string;
  get tagList() {
    if (this.type === "-") {
      return this.$store.state.tagList.filter(
        (tag: Tag) => tag.type === "expenditures"
      );
    } else {
      return this.$store.state.tagList.filter(
        (tag: Tag) => tag.type === "revenue"
      );
    }
  }
  selectedTags: Tag[] = [
    { id: "", name: "other", value: "其他", type: "expenditures" },
  ];
  created() {
    this.$store.commit("fetchTags");
  }
  toggle(tag: Tag) {
    const length = this.selectedTags.length;
    if (length >= 1) {
      this.selectedTags.splice(0);
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
  edit() {
    this.$router.push("/money/edit");
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 12px;
  padding: 16px;
  flex-grow: 1;
  overflow: auto;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      display: flex;
      flex-direction: column;
      width: 20%;
      padding: 8px 16px 8px 16px;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      &.selected {
        color: red;
        svg {
          animation: shake 0.3s linear;
        }
      }

      > span {
        text-align: center;
      }
    }
  }
  .icons {
    background: #f5f5f5;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 24px;
      height: 24px;
    }
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
</style>