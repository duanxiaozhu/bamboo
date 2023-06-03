<template>
  <ol>
    <li v-for="(group, index) in result" :key="index">
      <h3 class="title">
        {{ beautify(group.title)
        }}<span
          >支出:￥{{ group.dayExpenditure }}
          <span class="dayRevenue">收入￥:{{ group.dayRevenue }}</span></span
        >
      </h3>
      <ol>
        <li
          v-for="item in group.items"
          :key="item.id"
          class="record"
          @click="edit(item.tags[0].id)"
        >
          <span><Icon :name="item.tags[0].name" /></span>
          <span class="notes"
            >{{ item.tags[0].value }}
            <span>{{ item.notes }} </span>
          </span>
          <span class="amount"
            ><strong>￥{{ item.type }}{{ item.amount }} </strong></span
          >
        </li>
      </ol>
    </li>
  </ol>
</template>

<script lang='ts'>
import Tabs from "@/components/Tabs.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({
  components: { Tabs },
})
export default class recordList extends Vue {
  type = "-";
  interval = "day";

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get result() {
    const { recordList } = this;
    const newList = clone(recordList).sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    );
    if (newList.length === 0) {
      return [] as Result;
    }
    type Result = {
      title: string;
      dayExpenditure?: number;
      dayRevenue?: number;
      items: RecordList[];
    }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
      const typeGroup = group.items.filter((tags) => tags.type === "-");
      group.dayExpenditure = typeGroup.reduce(
        (sum, item) => sum + item.amount,
        0
      );
    });
    result.map((group) => {
      const typeGroup = group.items.filter((tags) => tags.type === "+");
      group.dayRevenue = typeGroup.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  edit(id:string) {
    this.$emit('update:value',id)
  }
}
</script>

<style scoped lang="scss">
%item {
  margin: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
  margin: 0;
  padding: 0 16px;
  background: #f5f5f5;
  font-size: 14px;
  > span {
    width: 48%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    > .dayRevenue {
      width: 50%;
      text-align: right;
    }
  }
}
.record {
  background: white;
  margin: 0 16px;
  @extend %item;
  min-height: 48px;
  border-bottom: 1px solid #e6e6e6;
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
    width: 20%;
    justify-content: flex-end;
  }
}
</style>