<template>
  <div class="tags">
    <ul class="current">
      <li>
        <Icon name="other" />
        <span>其他</span>
      </li>
      <li>
        <Icon name="catering" />
        <span>餐饮</span>
      </li>
      <li>
        <Icon name="traffic" />
        <span>交通</span>
      </li>
      <li>
        <Icon name="shopping" />
        <span>购物</span>
      </li>
      <li>
        <Icon name="reside" />
        <span>居住</span>
      </li>
      <li>
        <Icon name="amusement" />
        <span>娱乐</span>
      </li>
      <li>
        <Icon name="medical" />
        <span>医疗</span>
      </li>
    </ul>
    <div class="new">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      display: flex;
      flex-direction: column;
      width: 20%;
      padding: 16px;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      .icon {
        width: 28px;
        height: 28px;
      }
      > span {
        text-align: center;
      }
    }
  }
  > .new {
    padding-left: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>