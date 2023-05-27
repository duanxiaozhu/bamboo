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
import { Component} from "vue-property-decorator";
type sourceType = { name: string; value: string };


@Component({ components: { NumberPad, Types, FormItem, Tags } })
export default class Money extends Vue {
  tags=window.tagList; 
  // tags = [
  //   { name: "other", value: "其他" },
  //   { name: "catering", value: "餐饮" },
  //   { name: "traffic", value: "交通" },
  //   { name: "shopping", value: "购物" },
  //   { name: "reside", value: "居住" },
  //   { name: "amusement", value: "娱乐" },
  //   { name: "medical", value: "医疗" },
  // ];

  recordList: RecordItem[] = window.recordList;

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
    window.createRecord(this.record)
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
