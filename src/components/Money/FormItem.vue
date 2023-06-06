<template>
  <div>
    <label class="formItem">
      <span class="name">{{ this.fieldName }}</span>
      <input
        :type="type"
        :value="value"
        @input="onValueChanged($event.target.value)"
        :placeholder="this.placeholder"
      />
    </label>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  @Prop({ default: "text" }) type!: string;
  @Prop({ default: "" }) value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 15px;
  display: flex;
  padding-left: 16px;
  align-content: center;
  .name {
    font-size: 16px;
    padding-right: 16px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
    font-size: 15px;
  }
}
</style>