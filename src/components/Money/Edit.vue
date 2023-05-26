<template>
  <Layout>
    <Types />

    <div class="detail">
      <span class="add">追加新的标签</span>
      <span>></span>
    </div>
    <!-- <ol>
        <li v-for="tag in filteredList"
            class="detail">
          <div class="icon-wrapper">
            <Icon :name="tag.svg" class="icon"></Icon>
            <span class="tag">{{ tag.name }}</span>
          </div>
          <div @click="deleteTag(tag)">
            <Icon name="delete"
            ></Icon>
          </div>
        </li>
      </ol> -->
  </Layout>
</template>

<script lang='ts'>
import Types from "@/components/Money/Types.vue";
export default {
  name: "Money",
  components: { Types },
};
</script>

<style lang="scss">
.detail {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d3d3d3;
  min-height: 45px;
  align-items: center;
}
</style>
