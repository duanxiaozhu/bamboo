<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync="type" />
    <div class="detail" @click="addTag(tags[0].name)">
      <span class="add">添加新的标签</span>
      <span><Icon name="add" class="icons" /></span>
    </div>
    <div
      class="detail"
      v-for="(tag, index) in tags"
      :key="index"
      @click="EditTags(tag.id)"
    >
      <span> <Icon :name="tag.name" class="icons" />{{ tag.value }} </span>
      <span><Icon name="right" class="icons" /></span>
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
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit("fetchTags");
  }
  addTag(add: string) {
    this.$router.push(`/money/edit/add/${add}`);
  }
  EditTags(id: string) {
    this.$router.push(`/money/editTags/${id}`);
  }
}
</script>

<style lang="scss">
.detail {
  padding: 0 10px;
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
