<template>
  <div class="files-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Send node’s file management" name="first">
        Send node’s file management
      </el-tab-pane>
      <el-tab-pane label="Get node’s file management" name="second">
        Get node’s file management
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style lang="scss" scoped>
.files-container{
  height: 100%;
  width: 100%;
	background: #F5F5F5;
	padding: 0.2rem;
}
</style>