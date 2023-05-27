<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="(tag, index) in dataSource"
        :key="index"
        :class="{ selected: selectedTags[0].id===(tag.id)  }"
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
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Tags extends Vue {
  @Prop(Array) dataSource: Tag[] | undefined;
  selectedTags: Tag[] = [{id:"1",name: "other", value: "其他" }];
  toggle(tag: Tag) {
    const length = this.selectedTags.length;
    if (length >= 1) {
      this.selectedTags.splice(0);
      this.selectedTags.push(tag);
    }
    this.$emit('update:value',this.selectedTags)
  }
  edit() {
    this.$router.push("/money/edit");
  }
  create() {
    const names = window.prompt("请输入标签名");
    if (names === "") {
      return
    } else if (this.dataSource) {
      this.$emit("update:dataSource", [...this.dataSource, {name:'other',value:names}]);
    }
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
      padding: 16px;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      &.selected {
        color: red;
      }
      .icon {
        width: 28px;
        height: 28px;
      }
      > span {
        text-align: center;
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