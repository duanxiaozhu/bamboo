<template>
  <Layout>
    <div class="tags">
      <router-link
        :to="`/labels/edit/${tag.id}`"
        class="tag"
        v-for="(tag, index) in tags"
        :key="index"
      >
        <span><Icon :name="tag.name" />{{ tag.value }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import tagListModel from "@/models/tagListModel";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";



@Component({ components: { Button } })
export default class Labels extends Vue {
  tags = window.tagList;
  createTag() {
    const names = window.prompt("请输入标签名");
    if (names) {
      window.createTag(names)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    padding-right: 8px;
    span {
      display: flex;
      align-items: center;
    }
    svg {
      width: 28px;
      height: 28px;
      margin-right: 8px;
      color: #666;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>