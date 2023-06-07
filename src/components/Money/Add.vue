<template>
  <Layout :style="{ height: h + 'px' }">
    <div class="navBar">
      <Icon name="left" class="leftIcon" @click.native="goBack" />
      <span>{{ moneyType }}新标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value.sync="value"
        fieldName="标签名"
        placeholder="请输入标签名 "
      />
    </div>
    <div>
      <IconsList @update:value="onUpdateIcons" />
    </div>
    <div class="button-wrapper">
      <Button @click="save()">创建</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import IconsList from "@/components/Money/IconsList.vue";
@Component({
  components: { FormItem, Button, IconsList },
})
export default class Add extends Vue {
  icons = "dog";
  value = "";
  h = document.body.clientHeight;

  get moneyType() {
    return this.$route.params.types === "expenditures" ? "支出" : "收入";
  }

  save() {
    this.$store.commit("fetchTags");
    const names = this.$store.state.tagList.map(
      (tag: { value: string }) => tag.value
    );
    if (this.value.length === 0) {
      this.$error({
        centered: true,
        title: "标签名不能为空",
        content: "请输入标签名",
      });
    } else if (names.indexOf(this.value) >= 0) {
      this.$error({
        centered: true,
        title: "标签名重复了",
        content: "请重新输入",
      });
      this.value = "";
    } else {
      this.$store.commit("createTag", {
        name: this.icons,
        value: this.value,
        type: this.$route.params.types,
      });
      this.$message.success({ content: "已保存", duration: 1 });
      this.value = "";
    }
  }
  onUpdateIcons(value: string) {
    this.icons = value;
  }
  goBack() {
    this.$router.back();
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
  background: #e8e8e8;
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>