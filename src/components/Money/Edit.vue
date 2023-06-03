<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync="type" />
    <div class="detail" >
      <span class="add">添加新的标签</span>
      <span><Icon name="add" @click="addTag(tags[0].type)"/></span>
    </div>
    <div
      class="detail"
      v-for="(tag, index) in tags"
      :key="index"
    >
      <span> <Icon :name="tag.name" class="icons" />{{ tag.value }} </span>
      <span @click="deleteTag(tag)"><Icon name="remove" /></span>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { Tabs },
})
export default class Edit extends Vue {
  recordTypeList = recordTypeList;
  type = "-";
  get tags() {
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

  beforeCreate() {
    this.$store.commit("fetchTags");
  }
  deleteTag(tag: Tag) {
    const _this= this;
    this.$confirm({
      content: '确定要删除该标签吗?',
      okText: '确定',
      cancelText: "取消",
      centered:true,
      onOk(){
        _this.$store.commit('deleteTag', tag)
        _this.$message.success({content: '已删除',duration:1});
      }
    })


  }
  addTag(add: string) {
    this.$router.push(`/money/edit/add/${add}`);
  }
}
</script>

<style lang="scss">
.detail {
  padding: 0 15px 0 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d3d3d3;
  min-height: 45px;
  align-items: center;
  span {
    display: flex;
    align-items: center;
    > .icons {
      width: 28px;
      height: 28px;
      margin-right: 8px;
      color: #666;
    }
  }
}
</style>
