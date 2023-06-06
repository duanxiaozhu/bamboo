<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <FormItem
      :value.sync="record.notes"
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
import recordTypeList from "@/constants/recordTypeList";
import { Component, Watch } from "vue-property-decorator";

@Component({ components: { NumberPad, FormItem, Tags, Tabs } })
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  get recordList() {
    return this.$store.state.recordList;
  }
  record: RecordList = {
    id: "",
    tags: [{ id: "1", name: "other", value: "其他", type: "expenditures" }],
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

  saveRecord() {
    this.$store.commit("createRecords", this.record);
    this.record.notes = "";
    this.$message.success({ content: "已保存", duration: 1 });
  }
  @Watch("record.type")
  onTypeChange(type: string) {
    if (type === "-") {
      this.record.tags = [
        { id: "1", name: "other", value: "其他", type: "expenditures" },
      ];
    } else {
      this.record.tags = [
        { id: "12", name: "other", value: "其他", type: "revenue" },
      ];
    }
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
