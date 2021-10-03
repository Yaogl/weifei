<template>
  <div class="process-components">
    <div v-for="(item, index) in list" :key="index">
      <el-row class="flex">
        <el-col :style="{ color: colors[index] }" :span="14">{{ item.name }}</el-col>
        <el-col :span="6">{{ item.value }}</el-col>
        <el-col :span="4" align="right">{{ item.percent }}</el-col>
      </el-row>
      <div class="bar" :style="{ background: colors[index], width: item.percent }"></div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      instance: '',
      colors: ['#FF4141', '#FF8B00', '#F7D300', '#EDEC36', '#64EF2C', '#37D095', '#2FACDE', '#4370DB', '#7D4DF3', '#A236E5'],
      list: [
        { name: 'DDP-UDP', value: 36318, percent: '61%' },
        { name: 'DDP-UDP', value: 36318, percent: '61%' },
        { name: 'DDP-UDP', value: 36318, percent: '61%' },
        { name: 'DDP-UDP', value: 36318, percent: '61%' },
        { name: 'DDP-UDP', value: 36318, percent: '61%' },
        { name: 'DDP-UDP', value: 36318, percent: '61%' },
        { name: 'DDP-UDP', value: 36318, percent: '61%' },
        { name: 'DDP-UDP', value: 36318, percent: '61%' },
        { name: 'DDP-UDP', value: 36318, percent: '61%' },
        { name: 'DDP-UDP', value: 36318, percent: '61%' }
      ]
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
