<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <Tabs
      class="interval-tabs"
      class-prefix="interval"
      :data-source="intervalList"
      :value.sync="interval"
    />
    <ol>
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span><Icon :name="item.tags[0].name" /></span>
            <span class="notes"
              >{{ item.tags[0].value }}
              <span>{{ item.notes }} </span>
            </span>
            <span class="amount"><strong>￥{{item.type}}{{ item.amount }} </strong></span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang='ts'>
import Tabs from "@/components/Tabs.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get result() {
    const { recordList } = this;
    type HashTableValue = { title: string; items: RecordList[] };
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split("T");
      hashTable[date] = hashTable[date] || { title: date, items: [] };
      hashTable[date].items.push(recordList[i]);
    }
    console.log(hashTable);
    return hashTable;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
}
</script>

<style scoped lang="scss">
%item {
  margin  : 8px 16px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
  margin: 0;
  padding : 0 16px;
  background: #f5f5f5;
  font-size: 14px;
}
.record {
  background: white;
  margin: 0 16px;
  @extend %item;
  min-height: 48px;
  border-bottom:1px solid #e6e6e6;
  > span {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    > .icon {
      width: 28px;
      height: 28px;
    }
  }
  > .notes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    > span {
      font-size: 12px;
    }
  }
  > .amount {
    width: 28%;
    justify-content: flex-end;
  }
}
</style>

<style lang="scss" scoped>
.interval-tabs {
  background: #e8e8e8;
  padding: 4px 16px 8px 16px;
}
::v-deep .tabs > .interval-tabs-item {
  width: 33%;
  height: 30px;
  border: 1px solid black;
  margin: 0;
  font-size: 14px;
  display: flex;
  justify-content: center;
  &.selected {
    background: #333;
    color: #e8e8e8;
    &::after {
      display: none;
    }
  }
}
::v-deep .tabs > .interval-tabs-item:first-child {
  border-radius: 4px 0 0 4px;
}
::v-deep .tabs > .interval-tabs-item:last-child {
  border-radius: 0 4px 4px 0;
}
</style>