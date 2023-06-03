<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <FormItem
      @update:value="onUpdateNotes"
      fieldName="备注"
      placeholder="在这里输入备注"
    />
    <Tags :type="record.type" @update:value="onUpdateTags" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from '@/constants/recordTypeList'
import { Component } from "vue-property-decorator";

@Component({ components: { NumberPad, FormItem, Tags,Tabs } })
export default class Money extends Vue {
  // tags = [
  //   { name: "other", value: "其他" },
  //   { name: "catering", value: "餐饮" },
  //   { name: "traffic", value: "交通" },
  //   { name: "shopping", value: "购物" },
  //   { name: "reside", value: "居住" },
  //   { name: "amusement", value: "娱乐" },
  //   { name: "medical", value: "医疗" },
  // ];
  recordTypeList=recordTypeList;
  get recordList() {
    return this.$store.state.recordList;
  }
  record: RecordList = {
    tags: [{ id: "", name: "other", value: "其他",type:"expenditures" }],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date().toISOString(),
  };
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateTags(value: Tag[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    this.$store.commit("createRecords", this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
