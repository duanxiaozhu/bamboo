<template>
  <Layout class-prefix="layout">
    <div class="numberPad">
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="ok">ok</button>
        <button class="zero">0</button>
        <button>.</button>
      </div>
    </div>
    <div class="output">
      <span>￥100</span>
    </div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里输入备注" />
      </label>
    </div>
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
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
  </Layout>
</template>

<script lang='ts'>
export default {
  name: "Money",
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.types {
  background: #e8e8e8;
  font-size: 20px;
  display: flex;
  justify-content: center;
  > li {
    margin: 0 16px;
    height: 44px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #333;
    }
  }
}

.output {
  @extend %innerShadow;
  font-size: 22px;
  font-family: Consolas, monospace;
  padding: 9px 16px;
  text-align: right;
}

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

.numberPad {
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        height: 64 * 2px;
        float: right;
      }
      &.zero {
        width: 25 * 2%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>