<template>
  <Layout >
    <div class="title"><strong>账本明细</strong></div>
    <div class="parcel">
      <div>本月支出</div>
      <span class="expenses">￥{{ months("-") }}</span>

      <div class="budget">
        <span
          >本月收入<a>￥{{ months("+") }}</a></span
        >
        <span
          >预算剩余
          <a v-if="!$store.state.budget" @click="createBudget"> 请设置预算</a>
          <a v-else @click="createBudget"
            >￥{{ $store.state.budget - months("-") }}
          </a>
        </span>
      </div>
      <div class="chart">
        <router-link to="/statistics">
          <Icon name="statistics" />
          查看图表分析
        </router-link>
      </div>
    </div>
    <div v-if="recordList.length>0">
      <RecordListTags @update:value="edit" />
    </div>
    <div v-else >
      <NoResult/>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Tabs from "@/components/Tabs.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import RecordListTags from "@/components/Details/RecordListTags.vue";
import NoResult from "@/components/NoResult.vue";

@Component({
  components: { Tabs, RecordListTags ,NoResult},
})
export default class Details extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
    this.$store.commit("fetchBudget");
  }
  months(type: string) {
    let monthly = 0;
    const now = dayjs();
    const { recordList } = this;
    const newList = clone(recordList).filter((r) => r.type === type);
    for (let i = 0; i < newList.length; i++) {
      if (now.isSame(dayjs(newList[i].createdAt), "month")) {
        monthly += newList[i].amount;
      }
    }
    return monthly;
  }
  createBudget() {
    const name = window.prompt("请输入预算");
    if (!name) {
      this.$store.commit("removeBudget");
      return;
    }
    this.$store.commit("createBudget", parseFloat(name));
  }
  edit(id:string) {
    this.$router.push(`/details/edit/${id}`);
  }
}
</script>

<style scoped lang="scss">
.title {
  background: #e8e8e8;
  font-size: 18px;
  font-weight: 500;
  padding: 10px;
  text-align: center;
}

.parcel {
  margin: 8px 12px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background: #ffffff;

  div {
    color: #c5c5c5;
    font-size: 14px;
    padding: 5px 8px;
  }

  .budget {
    display: flex;
    justify-content: space-between;

    span {
      font-size: 14px;
      padding-right: 5px;

      a {
        color: #000;
      }
    }
  }

  .expenses {
    font-size: 28px;
    font-weight: bold;
    padding-left: 10px;
  }

  .chart {
    display: flex;
    justify-content: center;
    padding: 15px 0;
    > a {
      color: forestgreen;
    }
  }
}
</style>