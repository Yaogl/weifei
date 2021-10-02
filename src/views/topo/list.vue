<template>
  <div class="topo-list">
    <div v-loading="loading" class="container flex">
      <el-card v-for="(item, index) in tableList" :key="index" class="box-card">
        <div style="height: 230px;width: 410px">
          <img :src="IMGURL + item.thumb" alt="模板">
        </div>
        <div class="bottom">
          <p class="title">{{ item.name }}</p>
          <div class="btn" @click="useTemplate(item)">使用模板</div>
        </div>
      </el-card>

      <i v-for="i in 10" :key="i" />
    </div>
  </div>
</template>

<script>
import { getTopoTemplateList } from '@/api/topo'

export default {
  components: {
  },
  data() {
    return {
      IMGURL: process.env.VUE_APP_IMAGE_URL,
      loading: false,
      tableList: []
    }
  },
  created() {
    this.initTemplate()
  },
  methods: {
    useTemplate(item) {
      this.$emit('changeTemplate', item.id)
    },
    initTemplate() {
      this.loading = true
      getTopoTemplateList()
        .then(res => {
          this.loading = false
          if (res.code === 200) {
            this.tableList = res.data
          } else {
            this.$message.error('加载失败')
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
.topo-list {
  .el-card__body {
    padding: 12px;
  }
}
</style>
<style lang="scss" scoped>
@import 'global';
.topo-list {
  padding: 30px;
  .flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .box-card {
      width: 434px;
      height: 311px;
      background: #ffffff;
      box-shadow: 0px 2px 17px 0px rgba(7, 33, 60, 0.1);
      border-radius: 4px;
      position: relative;
      margin: 10px;
    }

    .box-card:hover {
      transform: translateY(-10px);
      box-shadow: 0px 7px 35px 0px rgba(7, 33, 60, 0.16);
      & .btn {
        background: $color-success;
        color: white;
      }
    }
    .first-card {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-success;
    }
    & > i {
      width: 332px;
      height: 0;
      margin: 10px;
    }
  }
  .btn {
    width: 90px;
    line-height: 28px;
    border-radius: 2px;
    border: 1px solid $color-success;
    color: $color-success;
    font-size: 12px;
    text-align: center;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    height: 68px;
    align-items: center;
    .title {
      font-size: 16px;
      color: #202020;
    }
  }
}
</style>
