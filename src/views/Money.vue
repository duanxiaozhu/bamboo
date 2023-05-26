<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <FormItem @update:value="onUpdateNotes" fieldName="备注" placeholder="在这里输入备注"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    <Types :value.sync="record.type" />
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel"
type sourceType = { name: string; value: string };
const recordList = recordListModel.fetch();
const tagList=tagListModel.fetch()

@Component({ components: { NumberPad, Types, FormItem, Tags } })
export default class Money extends Vue {
  tags=tagList; 
  // tags = [
  //   { name: "other", value: "其他" },
  //   { name: "catering", value: "餐饮" },
  //   { name: "traffic", value: "交通" },
  //   { name: "shopping", value: "购物" },
  //   { name: "reside", value: "居住" },
  //   { name: "amusement", value: "娱乐" },
  //   { name: "medical", value: "医疗" },
  // ];

  recordList: RecordItem[] = recordList;

  record: RecordItem = {
    tags: [{ name: "other", value: "其他" }],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date(),
  };

  onUpdateTags(value: sourceType[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }
  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
