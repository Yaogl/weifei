<template>
  <div class="navgation">
    <i v-if="$route.meta.back" class="el-icon-back" @click="$router.back()" />
    <div class="router-name">
      <div><Breadcrumb /></div>
      <slot name="navgation-right" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index.vue'

export default {
  name: 'Bread',
  components: {
    Breadcrumb
  }
}
</script>

<style lang="scss" scoped>
.navgation {
  // width: 100vw;
  height: 54px;
  line-height: 54px;
  background: #ffffff;
  margin-bottom: 30px;
  i {
    float: left;
    line-height: 54px;
    margin-left: 20px;
    font-size: 20px;
  }
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.09);
  .router-name {
    width: 83vw;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>
