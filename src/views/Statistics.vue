<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Tabs
      class="interval-tabs"
      class-prefix="interval"
      :data-source="intervalList"
      :value.sync="interval"
    />
  </Layout>
</template>

<script lang='ts'>
import Tabs from "@/components/Tabs.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import intervalList from '@/constants/intervalList'
import recordTypeList from '@/constants/recordTypeList'

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList=intervalList;
  recordTypeList=recordTypeList;
}
</script>

<style lang="scss" scoped>
.interval-tabs {
  background: #e8e8e8;
  padding: 4px 16px 8px 16px;

}
::v-deep .tabs>.interval-tabs-item {
  width: 33%;
  height: 30px;
  border: 1px solid black;
  margin: 0;
  font-size: 14px;
  display: flex;
  justify-content: center;
  &.selected{
    background: #333;
    color: #e8e8e8;
    &::after{
      display: none;
    }
  }
}
::v-deep .tabs>.interval-tabs-item:first-child{
      border-radius: 4px 0 0 4px;
}
::v-deep .tabs>.interval-tabs-item:last-child{
          border-radius: 0 4px 4px 0;
}
</style>