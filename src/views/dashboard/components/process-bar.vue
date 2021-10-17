<template>
  <div class="process-components" v-loading="loading">
    <div v-for="(item, index) in list" :key="index">
      <el-row class="flex">
        <el-col :style="{ color: colors[index] }" :span="14">{{ item.name }}</el-col>
        <el-col :span="6">{{ item.cnt }}</el-col>
        <el-col :span="4" align="right">{{ item.percent }}</el-col>
      </el-row>
      <div class="bar" :style="{ background: colors[index], width: item.percent }"></div>
    </div>
  </div>
</template>
<script>
import { protocalStatic } from '@/api/home'
export default {
  data () {
    return {
      instance: '',
      loading: false,
      colors: ['#FF4141', '#FF8B00', '#F7D300', '#EDEC36', '#64EF2C', '#37D095', '#2FACDE', '#4370DB', '#7D4DF3', '#A236E5'],
      list: []
    }
  },
  methods: {
    getListInfo (country) {
      this.loading = true
      const params = country ? { country } : {}
      protocalStatic(params).then(res => {
        this.list = res
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.process-components{
  font-size: 0.16rem;
  color: #fff;
  .bar{
    height: 0.02rem;
    margin: 0.05rem 0;
  }
  .flex{
    margin-top: 0.1rem;
  }
}
</style>
