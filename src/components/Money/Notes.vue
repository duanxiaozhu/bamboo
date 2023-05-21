<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里输入备注" />
    </label>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #fff;
  display: flex;
  padding-left: 16px;
  align-content: center;
  .name {
    padding-right: 16px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
  }
  input {
    height: 44px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>