<template>
  <div class="files-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Send node’s file management" name="first">
        <DownList />
      </el-tab-pane>
      <el-tab-pane label="Get node’s file management" name="second">
        <GetList />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import GetList from './components/get-list.vue'
import DownList from './components/down-list.vue'

export default {
  components: {
    GetList,
    DownList
  },
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