<template>
  <Layout :style="{ height: h + 'px' }">
    <div class="navBar">
      <Icon name="left" class="leftIcon" @click.native="goBack" />
      <span><strong>编辑内容</strong></span>
      <span class="rightIcon"></span>
    </div>
    <div class="label">
      <Icon :name="currentRecord.tags[0].name" />
      <span>{{ currentRecord.tags[0].value }}</span>
    </div>
    <div class="form-wrapper">
      <label class="notes">
        <span>金额</span>
        <input
          type="number"
          :value="currentRecord.amount"
          @change="updateAmount($event.target.value)"
          :placeholder="currentRecord.amount"
        />
      </label>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value.sync="currentRecord.notes"
        fieldName="备注"
        placeholder="添加备注 "
      />
    </div>
    <div class="button-wrapper">
      <Button @click="revise" class="revise">修改</Button>
      <Button @click="remove" class="delete">删除</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
@Component({
  components: { FormItem, Button },
})
export default class EditDetails extends Vue {
  currentRecord?: RecordList = undefined;
  h = document.body.clientHeight;

  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchRecords");
    this.$store.commit("setCurrentRecord", id);
    const record = this.$store.state.currentRecord;
    this.currentRecord = record;
  }
  updateAmount(value: string) {
    if (parseFloat(value).toString() === "NaN") {
      this.$warning({
        centered: true,
        title: "金额不能为空",
        content: "请输入金额",
      });
    } else {
      (this.currentRecord as RecordList).amount = parseFloat(value);
    }
  }

  revise() {
    const current = this.currentRecord as RecordList;
    this.$store.commit("updateRecord", {
      id: current.id,
      amount: current.amount,
      notes: current.notes,
    });
    this.$message.success({ content: "修改成功", duration: 1 });
  }
  remove() {
    if (this.currentRecord) {
      this.$store.commit("removeRecord", this.currentRecord.id);
      this.$message.success({ content: "删除成功", duration: 1 });
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  > .leftIcon {
    width: 28px;
    height: 28px;
    color: #666;
  }
  > .rightIcon {
    width: 28px;
    height: 28px;
  }
}
.label {
  min-height: 40px;
  padding: 0 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  > svg {
    width: 28px;
    height: 28px;
  }
}
.form-wrapper {
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  .notes {
    background: white;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;

    span {
      padding-right: 16px;
    }

    input {
      text-align: left;
      height: 40px;
      flex-grow: 1;
      background: transparent;
      border: none;
      font-size: 15px;
    }
  }
}
.button-wrapper {
  padding: 16px;
  margin-top: 44-16px;
  display: flex;
  justify-content: center;
  > .delete {
    margin-left: 30px;
    background: rgb(237, 65, 65);
  }
  > .revise {
    margin-right: 30px;
    background: rgb(28, 146, 28);
  }
}
</style>