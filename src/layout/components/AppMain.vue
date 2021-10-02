<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 60px);
  // overflow-y: scroll;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
@import 'global';
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}

.page {
  height: 100%;
  font-size: $font-big;
  color: $color-text-primary;
  .container {
    width: 83vw;
    max-height: 93%;
    margin: 0 auto;
  }
}
</style>
