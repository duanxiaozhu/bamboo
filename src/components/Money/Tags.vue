<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="(tag, index) in tagList"
        :key="index"
        :class="{ selected: selectedTags[0].value === tag.value }"
        @click="toggle(tag)"
      >
        <Icon :name="tag.name" />
        <span>{{ tag.value }}</span>
      </li>
      <li @click="edit">
        <Icon name="edit" />
        <span>编辑</span>
      </li>
    </ul>
    <!-- <div class="new">
      <button @click="create">新增标签</button>
    </div> -->
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
    { id: "1", name: "other", value: "其他", type: "expenditures" },
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
  create() {
    const names = window.prompt("请输入标签名");
    if (!names) {
      return window.alert("标签不能为空");
    }
    this.$store.commit("createTag", names);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
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
      .icon {
        width: 28px;
        height: 28px;
      }
      > span {
        text-align: center;
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
  > .new {
    padding-left: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>