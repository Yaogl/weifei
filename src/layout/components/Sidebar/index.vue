<template>
  <div class="side-left">
    <div v-if="slideBar.length > 0" class="side-inner">
      <el-menu
        :default-active="activeIndex"
        active-text-color="#20D78F"
        background-color="#fff"
        class="el-menu-top"
        text-color="#000"
      >
        <el-menu-item v-for="item in slideBar" :key="item.name" index="1">
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      slideBar: []
    }
  },
  watch: {
    $route: {
      handler(val) {
        this.slideBar = val.slideBar || []
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.side-left {
  padding: 24px 32px;

  .side-inner {
    min-height: 486px;
    background: #ffffff;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.11);
    border-radius: 2px;

    .is-active {
      border-left: 3px solid #20d78f;
      background: #f5f5f5 !important;
    }

    .el-menu-item {
      height: 36px;
      line-height: 36px;
      font-size: 16px;
    }
  }
}
</style>
