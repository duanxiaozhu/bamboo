<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" @click.native="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="tag.value"
        @update:value="update"
        fieldName="标签名"
        placeholder="请输入标签名 "
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import store from "@/store/index2";
@Component({ components: { FormItem, Button } })
export default class EditLabel extends Vue {
  tag?: { id: string; name: string; value: string } = undefined;
  created() {
    const id = this.$route.params.id;
    const tag = store.findTag(id);
    if (tag) {
      this.tag = tag;
    }
  }
  update(value: string) {
    if (this.tag) {
      store.updateTag(this.tag.id, value);
    }
  }
  remove() {
    if (this.tag) {
      if(store.removeTag(this.tag.id)){
        this.$router.back()
      }else{
        window.alert('删除失败')
      }
    }
  }
  goBack(){
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  > .title {
  }
  > .leftIcon {
    width: 28px;
    height: 28px;
    color: #666;
  }
  > .rightIcon {
    width: 28px;
    height: 28px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>